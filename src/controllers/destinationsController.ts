import { RequestHandler } from "express";
import prisma from "../db";
import { errorhandler, ApiResponses } from "../utils";
import httpStatus from "http-status";

export const createDestination: RequestHandler = async (req, res) => {
  const { url, method, headers, account_id } = req.body;

  // Check if account exists
  const [account, accountError] = await errorhandler(
    prisma.account.findUnique({
      where: { account_id },
    })
  );

  if (accountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while trying to fetch related account."
    );
  }

  if (!account) {
    return ApiResponses.returnNotFound(
      res,
      httpStatus.NOT_FOUND,
      "The account does not exist."
    );
  }

  const [destination, destinationError] = await errorhandler(
    prisma.destination.create({
      data: {
        url,
        http_method: method,
        headers: JSON.stringify(headers),
        accountId: account_id,
      },
    })
  );

  if (destinationError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while creating the destination.",
      destinationError
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Destination created successfully.",
    destination
  );
};

// All destinations by an account
export const getAllDestinations: RequestHandler = async (req, res) => {
  const { account_id } = req.params;

  if (!account_id) {
    return ApiResponses.returnBadRequest(
      res,
      httpStatus.BAD_REQUEST,
      "Account id is required"
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
      "Unexpected error occurred while trying to retrieve accounts"
    );
  }

  if (!account) {
    return ApiResponses.returnNotFound(
      res,
      httpStatus.NOT_FOUND,
      "Account with ID not found."
    );
  }

  const [destinations, destinationsError] = await errorhandler(
    prisma.destination.findMany({
      where: { accountId: account_id },
      include: { account: true }, // Include account details if needed
    })
  );

  if (destinationsError) {
    console.error(destinationsError);
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while fetching destinations.",
      destinationsError
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Destinations fetched successfully.",
    destinations
  );
};

export const updateDestination: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { url, method, headers, account_id } = req.body;

  const [account, accountError] = await errorhandler(
    prisma.account.findUnique({
      where: { account_id },
    })
  );

  if (accountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while trying to fetch related account.",
      accountError
    );
  }

  if (!account) {
    return ApiResponses.returnNotFound(
      res,
      httpStatus.NOT_FOUND,
      "The specified account does not exist."
    );
  }

  // Check if destination exists
  const [existingDestination, destinationError] = await errorhandler(
    prisma.destination.findUnique({
      where: { id: parseInt(id) },
    })
  );

  if (destinationError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while checking for the destination.",
      destinationError
    );
  }

  if (!existingDestination) {
    return ApiResponses.returnNotFound(
      res,
      httpStatus.NOT_FOUND,
      "Destination not found."
    );
  }

  // Prepare update data
  const updateData: any = {};
  if (url) updateData.url = url;
  if (method) updateData.http_method = method;
  if (headers) updateData.headers = JSON.stringify(headers);
  if (account_id) updateData.accountId = account_id;

  // Update the destination
  const [updatedDestination, updateError] = await errorhandler(
    prisma.destination.update({
      where: { id: parseInt(id) },
      data: updateData,
    })
  );

  if (updateError) {
    console.error(updateError);
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while updating the destination.",
      updateError
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Destination updated successfully.",
    updatedDestination
  );
};

export const deleteDestination: RequestHandler = async (req, res) => {
  const { id } = req.params;

  // Check if destination exists
  const [existingDestination, destinationError] = await errorhandler(
    prisma.destination.findUnique({
      where: { id: parseInt(id) },
    })
  );

  if (destinationError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while checking for the destination.",
      destinationError
    );
  }

  if (!existingDestination) {
    return ApiResponses.returnNotFound(
      res,
      httpStatus.NOT_FOUND,
      "Destination not found."
    );
  }

  // Delete the destination
  const [deletedDestination, deleteError] = await errorhandler(
    prisma.destination.delete({
      where: { id: parseInt(id) },
    })
  );

  if (deleteError) {
    console.error(deleteError);
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while deleting the destination.",
      deleteError
    );
  }

  return ApiResponses.returnSuccess(
    res,
    "Destination deleted successfully.",
    deletedDestination
  );
};
