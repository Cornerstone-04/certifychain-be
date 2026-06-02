import cors from "cors";
import express, { type ErrorRequestHandler, type Handler } from "express";
import fileUpload from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import { AppError } from "./error.js";
import { createUploadRouter } from "./features/upload/uploadHandler.js";
import { createVerifyRouter } from "./features/verify/verifyHandlers.js";

const allowedOrigins = [
  "https://labeeb-fe.vercel.app",
  "http://localhost:5173",
];

const rootHandler: Handler = (_req, res) => {
  res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "this is the root route",
  });
};

const catchAll: Handler = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    isSuccess: false,
    message: `The resource you're looking for at ${req.method} ${req.originalUrl} does not exist`,
  });
};

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const statusCode =
    err instanceof AppError
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  if (!(err instanceof AppError)) {
    console.error(err);
  }

  res.status(statusCode).json({
    isSuccess: false,
    message:
      err instanceof AppError ? err.message : "An unexpected error occurred",
  });
};

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new AppError(StatusCodes.FORBIDDEN, "Origin is not allowed"));
      },
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(
    fileUpload({
      abortOnLimit: true,
      limits: { fileSize: 10 * 1024 * 1024 },
      tempFileDir: "/tmp/",
      useTempFiles: true,
    }),
  );

  app.get("/", rootHandler);
  app.use("/upload", createUploadRouter());
  app.use("/verify", createVerifyRouter());
  app.use(catchAll);
  app.use(errorHandler);

  return app;
}
