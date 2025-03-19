import { Router } from "express";

const verifyRouter = Router();

verifyRouter.use("/verify");

verifyRouter.post("/", (req, res) => {
  const { hash } = req.body;

  const isValid = verifyHash(hash);

  if (isValid) {
    res.status(200).json({
      message: `File with hash ${hash} is authentic.`,
    });
  }
});
