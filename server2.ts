import express from "express";
import bodyParser from "body-parser";
import { Response } from "express";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/health", (_, res: Response) => {
  res.status(200).send({ message: "hello!" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
