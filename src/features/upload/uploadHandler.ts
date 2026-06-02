import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error.js";
import { getHelia } from "../../helia.js";
import { uploadToIpfs } from "./uploadServices.js";

export function createUploadRouter() {
  const router = Router();

  router.get("/", (_req, res) => {
    res.status(StatusCodes.OK).json({
      isSuccess: true,
      message: "Upload service is available",
    });
  });

  router.post("/", async (req, res, next) => {
    try {
      if (!req.files) {
        throw new AppError(StatusCodes.BAD_REQUEST, "A certificate file is required");
      }

      const cid = await uploadToIpfs(req.files, await getHelia());
      res.status(StatusCodes.CREATED).json({
        isSuccess: true,
        cid,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
