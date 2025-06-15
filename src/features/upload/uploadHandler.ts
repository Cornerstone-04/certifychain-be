import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { uploadToIpfs } from "./uploadServices.js";
import App from "../../main.js";

// create router instance for upload routes
export const uploadRouter = Router();
// define GET / route for testing
uploadRouter.get("/", (_, res) => {
  res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "everywhere good still",
  });
});

uploadRouter.post(
  "/",
  // verifySchema(uploadSchema),
  async (req, res) => {
    if (!req.files)
      res.status(StatusCodes.BAD_REQUEST).json({
        isSuccess: false,
      });
    else {
      const cid = await uploadToIpfs(req.files, App.server.helia!);
      res.setHeader("Content-Type", "img/png");
      res.status(StatusCodes.ACCEPTED).json({
        isSuccess: true,
        cid,
      });
    }
  },
);
