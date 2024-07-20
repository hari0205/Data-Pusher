import { Response } from "express";
import httpStatus from "http-status";

interface ApiResponse {
  message: string;
  status: number;
  data?: any;
  error?: any;
}

export default class ApiResponses {
  private static isDev = process.env.NODE_ENV === "development";
  private static sendResponse(
    res: Response,
    statusCode: number,
    response: ApiResponse
  ) {
    return res.status(statusCode).json(response);
  }

  private static formatError(error: any): any {
    if (this.isDev && error instanceof Error) {
      return {
        message: error.message,
        stack: error.stack,
      };
    }
    return error;
  }
  static returnCreated(
    res: Response,
    status: number,
    message: string = "CREATED",
    error: any
  ) {
    return this.sendResponse(res, httpStatus.CREATED, {
      message,
      status,
      error: this.formatError(error),
    });
  }

  static returnDeleted(
    res: Response,
    status: number,
    message: string = "DELETED",
    error: any
  ) {
    return this.sendResponse(res, httpStatus.NO_CONTENT, {
      message,
      status,
      error: this.formatError(error),
    });
  }

  static returnSuccess(
    res: Response,
    message: string = "SUCCESS",
    status: number,
    data?: any
  ) {
    return this.sendResponse(res, httpStatus.OK, { message, status, data });
  }

  static returnBadRequest(
    res: Response,
    status: number,
    message: string = "BAD REQUEST",
    error?: any
  ) {
    return this.sendResponse(res, httpStatus.BAD_REQUEST, {
      message,
      status,
      error: this.formatError(error),
    });
  }

  static returnUnauthorized(
    res: Response,
    status: number,
    message: string = "UNAUTHORIZED",
    error?: any
  ) {
    return this.sendResponse(res, httpStatus.UNAUTHORIZED, {
      message,
      status,
      error: this.formatError(error),
    });
  }

  static returnForbidden(
    res: Response,
    status: number,
    message: string = "FORBIDDEN",
    error?: any
  ) {
    return this.sendResponse(res, httpStatus.FORBIDDEN, {
      message,
      status,
      error: this.formatError(error),
    });
  }

  static returnNotFound(
    res: Response,
    status: number,
    message: string = "NOT FOUND",
    error?: any
  ) {
    return this.sendResponse(res, httpStatus.NOT_FOUND, {
      message,
      status,
      error: this.formatError(error),
    });
  }

  static returnInternalServerError(
    res: Response,
    status: number,
    message: string = "INTERNAL SERVER ERROR",
    error?: any
  ) {
    return this.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {
      message,
      status,
      error: this.formatError(error),
    });
  }

  static returnCustomError(
    res: Response,
    status: number,
    message: string,
    error?: any
  ) {
    return this.sendResponse(res, status, {
      message,
      status,
      error: this.formatError(error),
    });
  }
}
