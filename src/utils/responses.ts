import { Request, response, Response } from "express";
import httpStatus from "http-status";

export default class ApiResponses {
  static returnSuccess(res: Response, successmsg?: string, data?: any) {
    return res
      .status(httpStatus.OK)
      .json({ message: successmsg || "SUCCESS", data });
  }

  static returnBadRequest(res: Response, errormsg?: string) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: errormsg || "BAD REQUEST" });
  }

  static returnInternalServerError(
    res: Response,
    errormsg?: string,
    data?: any
  ) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: errormsg || "INTERNAL SERVER ERROR" });
  }
}
