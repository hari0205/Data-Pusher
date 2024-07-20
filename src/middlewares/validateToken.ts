import { Request, Response, NextFunction } from "express";
import prisma from "../db";
import ApiResponses from "../utils/responses";
import errorhandler from "../utils/asyncHandler";
import httpStatus from "http-status";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("CL-X-TOKEN");
  
  if (!token) {
    return ApiResponses.returnUnauthorized(
      res,
      httpStatus.UNAUTHORIZED,
      "Un Authenticate"
    );
  }

  const [account, accountError] = await errorhandler(
    prisma.account.findUnique({ where: { app_secret_token: token } })
  );

  if (accountError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while identifying the account.",
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

  req.accountId = account.account_id;

  next();
};
