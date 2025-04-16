import { Router } from "express";
import { GetFile } from "./verifyServices.js";
import App from "../../main.js";
import { StatusCodes } from "http-status-codes";

// create router instance for verification routes
export const verifyRouter = Router();

// define GET / route for basic health check
verifyRouter.get("/", (req, res) => {
  // return static success message
  res.json({
    message: "everywhere good",
  });
});

// define POST /getFile route to retrieve file from IPFS
verifyRouter.post("/getFile", async (req, res) => {
  // extract hash from request body
  const { hash } = req.body;

  // retrieve file using hash and Helia instance
  const file = await GetFile(hash, App.server.helia!);

  // return retrieved file in response
  res.status(StatusCodes.OK).json({
    isSuccess: true,
    file,
  });
});

export default { verifyRouter };
