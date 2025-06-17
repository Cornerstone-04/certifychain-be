import express, { ErrorRequestHandler, Express, Handler, json } from "express";

import cors from "cors";
import type { Helia } from "helia";
import { createHelia } from "helia";
import { verifyRouter } from "./features/verify/verifyHandlers.js";
import { uploadRouter } from "./features/upload/uploadHandler.js";

import { StatusCodes } from "http-status-codes";
import { AppError } from "./error.js";
import { FsBlockstore } from "blockstore-fs";
import { LevelDatastore } from "datastore-level";
import multer, { diskStorage } from "multer";
import fileUpload from "express-fileupload";

// define server structure
type Server = {
  app: Express;
  helia: Helia | null;
  startServer: () => void;
  initHelia: () => void;
};

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// initialise server object
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
    const blockstorePath = "./ipfs/blockstore";
    const datastorePath = "./ipfs/datastore";

    const blockstore = new FsBlockstore(blockstorePath);
    const datastore = new LevelDatastore(datastorePath);

    const h = await createHelia({
      blockstore,
      datastore,
    });
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

// cutsom error handler middleware for custom app erros
const errorHanlder: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statuscode).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// error handler for unknown routes
const CatchAll: Handler = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    isSuccess: false,
    message: `The resource you're looking for at ${req.method} ${req.baseUrl}${req.path} does not exist`,
  });
};

const allowedOrigins = [
  "https://labeeb-fe.vercel.app", // your frontend domain
  "http://localhost:5173", // local dev
];

const { app } = server;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.get("/", rootHandler);
app.use("/upload", uploadRouter);
app.use("/verify", verifyRouter);
app.use(errorHanlder);
app.use("/*", CatchAll);
server.startServer();

export default { server };
