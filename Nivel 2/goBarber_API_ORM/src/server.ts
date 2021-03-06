import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import AppError from "./errors/AppError";

import uploadConfig from "./config/upload";

import routes from "./routes";

import "./database";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  console.error(err);

  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

app.listen(3333, () => {
  console.log("🚀 SERVER RUNNING 🚀");
});
