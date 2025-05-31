import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { verifySchema } from "../../middlewares/verifySchema.js";
import { uploadSchema } from "../../schema/index.js";
import { uploadToIpfs } from "./uploadServices.js";
import App from "../../main.js";
import { getFile } from "../verify/VerifyRepository.js";
import { GetFile } from "../verify/verifyServices.js";
// create router instance for upload routes
export const uploadRouter = Router();
// define GET / route for testing
uploadRouter.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "everywhere good still",
  });
});

uploadRouter.post(
  "/",
  // verifySchema(uploadSchema),
  async (req, res) => {
    if (!req.files) res.status(StatusCodes.BAD_REQUEST).json();
    else {
      const cid = await uploadToIpfs(req.files, App.server.helia!);
      res.status(StatusCodes.ACCEPTED).json({
        isSuccess: true,
        cid,
      });
    }
  },
);
