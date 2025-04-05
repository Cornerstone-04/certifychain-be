import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { verifySchema } from "../../middlewares/verifySchema.js";
import { uploadSchema } from "../../schema/index.js";
import { uploadToIpfs } from "./uploadServices.js";
import App from "../../main.js";

export const uploadRouter = Router();
uploadRouter.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "everywhere good still",
  });
});

uploadRouter.post(
  "/upload",
  verifySchema(uploadSchema),
  async (req, res, next) => {
    "console";
    const { name, content } = req.body;
    console.log(req.body);
    const cid = await uploadToIpfs(req.body, App.server.helia!);

    res.status(StatusCodes.ACCEPTED).json({
      isSuccess: true,
      cid,
    });
  }
);
