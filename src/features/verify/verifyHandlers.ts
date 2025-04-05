import { Router } from "express";
import { getFile } from "./VerifyRepository.js";
import App from "../../main.js";
import { StatusCodes } from "http-status-codes";

export const verifyRouter = Router();

verifyRouter.get("/", (req, res) => {
  res.json({
    message: "everywhere good",
  });
});

verifyRouter.post("/getFile", async (req, res) => {
  const { hash } = req.body;

  const file = await getFile(hash, App.server.helia!);

  res.status(StatusCodes.OK).json({
    isSuccess: true,
    file,
  });
});

export default { verifyRouter };
