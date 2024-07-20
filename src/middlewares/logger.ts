import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import util from "util";

const logDirectory = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);
const errorLogStream = fs.createWriteStream(
  path.join(logDirectory, "error.log"),
  { flags: "a" }
);
const debugLogStream = fs.createWriteStream(
  path.join(logDirectory, "debug.log"),
  { flags: "a" }
);

// logging format for morgan
const format =
  ":date[clf] :method :url :status :res[content-length] - :response-time ms - :remote-addr";

//  use the writable stream and log format for file logging
const morganFileLogger = morgan(format, { stream: accessLogStream });

// Morgan for stdout
const morganConsoleLogger = morgan(format);

// Custom logger middleware to log additional information
const customLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`IP Address: ${req.ip}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);

  // Add a listener for the response 'finish' event to log response details
  //TODO: try make this work
  res.on("finish", () => {
    try {
      const responseBody = res.locals.body;
      if (typeof responseBody === "object") {
        console.log(`Response Status: ${res.statusCode}`);
        console.log(
          `Response Body: ${JSON.stringify(responseBody, replacerFunc())}`
        );
      } else {
        console.log(`Response Status: ${res.statusCode}`);
        console.log(`Response Body: ${responseBody}`);
      }
    } catch (err) {
      console.error("Error logging response body:", err);
    }
  });
  next();
};

const replacerFunc = () => {
  const visited = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
};
const originalConsole = {
  log: console.log,
  error: console.error,
  debug: console.debug,
  info: console.info,
  warn: console.warn,
};

function formatLogMessage(message: any): string {
  const timestamp = new Date().toISOString();
  return `${timestamp} ${util.format(message)}\n`;
}

console.log = function (...args: any[]) {
  const message = formatLogMessage(args);
  accessLogStream.write(message);
  originalConsole.log.apply(console, args);
};

console.error = function (...args: any[]) {
  const message = formatLogMessage(args);
  errorLogStream.write(message);
  originalConsole.error.apply(console, args);
};

console.debug = function (...args: any[]) {
  const message = formatLogMessage(args);
  debugLogStream.write(message);
  originalConsole.debug.apply(console, args);
};

console.info = console.log;
console.warn = console.error;

export { morganFileLogger, morganConsoleLogger, customLogger };
