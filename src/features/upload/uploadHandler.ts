import { Router } from "express";

export const uploadRouter = Router();

uploadRouter.post("/", (req, res, next) => {
  const file = req.body;
});
