import express from "express";
import { Response } from "express";

import dotenv from "dotenv";
import v1router from "./routes";
import errorHandler from "./middlewares/globalErrorHandler";
import {
  customLogger,
  morganConsoleLogger,
  morganFileLogger,
} from "./middlewares/logger";
import { rateLimiter } from "./middlewares";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable 'trust proxy' to correctly capture client's IP address behind a reverse proxy
app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:"],
      },
    },
    // Disable strict-transport-security for local development
    strictTransportSecurity: false,
  })
);

// Enable CORS
app.use(cors());

// Prevent XSS attacks
app.use(xss());

// Use the morgan middleware for logging requests to a file
app.use(morganFileLogger);

// Use the morgan middleware for logging requests to console
app.use(morganConsoleLogger);

// Use the custom logger middleware for additional logging
app.use(customLogger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1MB" }));

app.get("/health", (_, res: Response) => {
  res.status(200).send({ message: "hello!" });
});

// Apply the rate limiter
app.use(rateLimiter);

// Api ROutes
app.use("/api/v1", v1router);

// Global error handler
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Graceful shutdown function
function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });

  // If after 10 seconds, forcefully shut down
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down."
    );
    process.exit(1);
  }, 10000);
}

// Handle termination signals (e.g., SIGTERM, SIGINT)
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
