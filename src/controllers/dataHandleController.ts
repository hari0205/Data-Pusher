import { Request, Response, NextFunction, RequestHandler } from "express";
import prisma from "../db";
import ApiResponses from "../utils/responses";
import errorhandler from "../utils/asyncHandler";
import axios from "axios";
import httpStatus from "http-status";

export const handleData: RequestHandler = async (req, res) => {
  const accountId = req.accountId;
  const data = req.body;

  const [destinations, destinationsError] = await errorhandler(
    prisma.destination.findMany({ where: { accountId } })
  );

  if (destinationsError) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while fetching the destinations.",
      destinationsError
    );
  }

  const promises = destinations.map(async (destination: any) => {
    try {
      const headers = JSON.parse(destination.headers); // Convert headers string back to JSON

      console.log(`Preparing request to URL: ${destination.url}`);
      console.log(`Method: ${destination.http_method}`);
      console.log(`Headers: ${JSON.stringify(headers)}`);
      console.log(`Data: ${JSON.stringify(data)}`);
      if (destination.http_method === "GET") {
        // Send data as query parameters for GET requests
        await axios.get(destination.url, {
          params: data,
          headers,
        });
      } else if (
        destination.http_method === "POST" ||
        destination.http_method === "PUT"
      ) {
        // Send data as JSON body for POST or PUT requests
        await axios({
          method: destination.http_method.toLowerCase(),
          url: destination.url,
          data,
          headers,
        });
      } else {
        console.error(`Unsupported HTTP method: ${destination.http_method}`);
      }
    } catch (error) {
      console.error(
        `Error sending data to destination ${destination.url}: `,
        error
      );
      throw error; // Re-throw the error to catch it in Promise.all
    }
  });

  try {
    await Promise.all(promises);
    return ApiResponses.returnSuccess(
      res,
      "Data forwarded successfully.",
      httpStatus.OK
    );
  } catch (error) {
    return ApiResponses.returnInternalServerError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while sending data to destinations."
    );
  }
};
