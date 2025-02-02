import { RequestHandler } from "express";
import prisma from "../db";
import {
  generateSecretToken,
  generateUUID,
  errorhandler,
  ApiResponses,
} from "../utils";
import httpStatus from "http-status";

export const createAccount: RequestHandler = async (req, res) => {
  const { email, account_name, website } = req.body;

  // Just pass the promise
  const [acct, accountError] = await errorhandler(
    prisma.account.findUnique({
      where: { email },
    })
  );

  if (acct) {
    return ApiResponses.returnBadRequest(
      res,
      httpStatus.BAD_REQUEST,
      "Email already in use.",
      new Error("The email entered is already in use.")
    );
  } else if (accountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An Unknown Error occurred.",
      accountError
    );
  }

  const [createdAccount, createAccountError] = await errorhandler(
    prisma.account.create({
      data: {
        email,
        account_name,
        website,
        app_secret_token: generateSecretToken(),
        account_id: generateUUID(),
      },
    })
  );

  if (createAccountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An Unexpected Error occurred while creating account.",
      createAccountError
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Account created successfully.",
    createdAccount
  );
};

export const getAllAccounts: RequestHandler = async (req, res) => {
  const [accounts, accountsError] = await errorhandler(
    prisma.account.findMany({
      include: {
        destinations: true,
      },
    })
  );

  if (accountsError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while fetching accounts.",
      accountsError
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Accounts retrieved successfully.",
    accounts
  );
};

export const getAccount: RequestHandler = async (req, res) => {
  const { account_id } = req.params;

  if (!account_id) {
    return ApiResponses.returnBadRequest(
      res,
      httpStatus.BAD_REQUEST,
      " An account id must be provided."
    );
  }

  const [account, accountError] = await errorhandler(
    prisma.account.findUnique({
      where: { account_id },
      include: {
        destinations: true,
      },
    })
  );

  if (accountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while fetching the account.",
      accountError
    );
  }

  if (!account) {
    return ApiResponses.returnNotFound(
      res,
      httpStatus.NOT_FOUND,
      "Account not found."
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Account retrieved successfully.",
    account
  );
};

export const updateAccount: RequestHandler = async (req, res) => {
  const { email, account_name, website } = req.body;
  const { account_id } = req.params;

  if (!account_id) {
    return ApiResponses.returnBadRequest(
      res,
      httpStatus.BAD_REQUEST,
      "account id must be provided."
    );
  }

  const [account, accountError] = await errorhandler(
    prisma.account.findUnique({
      where: { account_id },
    })
  );

  if (accountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while fetching the account.",
      accountError
    );
  }

  if (!account) {
    return ApiResponses.returnBadRequest(
      res,
      httpStatus.NOT_FOUND,
      "Account not found."
    );
  }

  const [updatedAccount, updateAccountError] = await errorhandler(
    prisma.account.update({
      where: { account_id },
      data: {
        account_name,
        website,
        email,
      },
    })
  );

  if (updateAccountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while updating the account.",
      updateAccountError
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Account updated successfully.",
    updatedAccount
  );
};

export const deleteAccount: RequestHandler = async (req, res) => {
  const { account_id } = req.params;

  if (!account_id) {
    return ApiResponses.returnBadRequest(
      res,
      httpStatus.BAD_REQUEST,
      "An account id must be provided."
    );
  }

  const [account, accountError] = await errorhandler(
    prisma.account.findUnique({
      where: { account_id },
    })
  );

  if (accountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while fetching the account.",
      accountError
    );
  }

  if (!account) {
    return ApiResponses.returnBadRequest(
      res,
      httpStatus.NOT_FOUND,
      "Account not found."
    );
  }

  const [deletedAccount, deleteAccountError] = await errorhandler(
    prisma.account.delete({
      where: { account_id },
    })
  );

  if (deleteAccountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while deleting the account.",
      deleteAccountError
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Account deleted successfully.",
    deletedAccount
  );
};
