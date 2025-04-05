import express, { ErrorRequestHandler, Express, Handler, json } from "express";

import type { Helia } from "helia";
import { createHelia } from "helia";
import { verifyRouter } from "./features/verify/verifyHandlers.js";
import { uploadRouter } from "./features/upload/uploadHandler.js";

import { StatusCodes } from "http-status-codes";
import { AppError } from "./error.js";

type Server = {
  app: Express;
  helia: Helia | null;
  startServer: () => void;
  initHelia: () => void;
};

const server: Server = {
  app: express(),
  helia: null,

  startServer() {
    if (!this.helia) {
      this.initHelia();
    }
    this.app.listen(3000);
  },
  async initHelia() {
    const h = await createHelia();
    this.helia = h;
    this.helia.start();
  },
};

const rootHandler: Handler = (req, res, next) => {
  res.status(200).json({
    isSuccess: true,
    message: "this is the root route",
  });
};

const errorHanlder: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statuscode).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

const CatchAll: Handler = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    isSuccess: false,
    message: `The resource you're looking for at ${req.method} ${req.baseUrl}${req.path} does not exist`,
  });
};

const { app } = server;

app.use(json());
app.get("/", rootHandler);
app.use("/upload", uploadRouter);
app.use("/verify", verifyRouter);
app.use(errorHanlder);
app.use("/*", CatchAll);
server.startServer();

export default { server };
