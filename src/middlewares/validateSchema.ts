import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiResponses } from "../utils";
import httpStatus from "http-status";

const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.debug(`Validating schema for ${JSON.stringify(req.body)}`);

      schema.parse(req.body);
      next();
    } catch (e: any) {
      return ApiResponses.returnBadRequest(
        res,
        httpStatus.BAD_REQUEST,
        "Invalid request body",
        e
      );
    }
  };

export default validate;
