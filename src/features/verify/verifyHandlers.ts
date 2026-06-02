import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getHelia } from "../../helia.js";
import { verifySchema } from "../../middlewares/verifySchema.js";
import { getFileSchema } from "../../schema/index.js";
import { getFileByCid } from "./verifyServices.js";

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function createVerifyRouter() {
  const router = Router();

  router.get("/", (_req, res) => {
    res.status(StatusCodes.OK).json({
      isSuccess: true,
      message: "Verification service is available",
    });
  });

  router.post("/getFile", verifySchema(getFileSchema), async (req, res, next) => {
    const { hash, fileType, fileName } = req.body;
    const contentType = fileType ?? "application/octet-stream";
    const downloadName = sanitizeFileName(fileName ?? "certificate");

    try {
      res.setHeader("Content-Type", contentType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${downloadName}"`,
      );

      for await (const chunk of getFileByCid(hash, await getHelia())) {
        res.write(chunk);
      }
      res.end();
    } catch (error) {
      next(error);
    }
  });

  return router;
}
