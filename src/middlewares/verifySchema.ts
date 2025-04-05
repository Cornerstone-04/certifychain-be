import { ifError } from "assert";
import { Handler } from "express";
import { ZodError, ZodSchema } from "zod";

export const verifySchema = (ShemaDef: ZodSchema): Handler => {
  console.log("verifying request body");
  return (req, res, next) => {
    try {
      ShemaDef.parse(req.body);
      console.log("request body verified");
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.json({
          isSuccess: false,
          errors: err,
        });
      }
    }
  };
};
