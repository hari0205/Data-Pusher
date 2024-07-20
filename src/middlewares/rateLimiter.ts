import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

// Define the rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, //  100 requests per `window` (15 mins)
  message: {
    status: httpStatus.TOO_MANY_REQUESTS,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  headers: true, // Include rate limit info in the headers
});

export default limiter;
