import { Router } from "express";
import { verifyHash } from "./verifyServices.ts";

const verifyRouter = Router();

verifyRouter.use("/verify");

verifyRouter.get("/", (req, res) => {
  res.json({
    message: "everywhere good",
  });
});

verifyRouter.post("/", (req, res) => {
  const { hash } = req.body;

  const isValid = verifyHash(hash);

  if (isValid) {
    res.status(200).json({
      message: `File with hash ${hash} is authentic.`,
    });
  }
});

export default { verifyRouter };
