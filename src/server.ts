import express from "express";
import bodyParser from "body-parser";
import { Response } from "express";

import dotenv from "dotenv";
import v1router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "1MB" }));

app.get("/health", (_, res: Response) => {
  res.status(200).send({ message: "hello!" });
});

app.use("/api/v1", v1router);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
