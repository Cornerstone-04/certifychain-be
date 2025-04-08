import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { verifySchema } from "../../middlewares/verifySchema.js";
import { uploadSchema } from "../../schema/index.js";
import { uploadToIpfs } from "./uploadServices.js";
import App from "../../main.js";

// create router instance for upload routes
export const uploadRouter = Router();
// define GET / route for testing
uploadRouter.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "everywhere good still",
  });
});

// define POST /upload route for file upload
uploadRouter.post(
  "/upload",
  verifySchema(uploadSchema),
  async (req, res, next) => {
    "console";
    const { name, content } = req.body;
    console.log(req.body);
    const cid = await uploadToIpfs(req.body, App.server.helia!);

    // return success response with CID
    res.status(StatusCodes.ACCEPTED).json({
      isSuccess: true,
      cid,
    });
  }
);
