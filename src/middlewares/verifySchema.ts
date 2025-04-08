import { ifError } from "assert";
import { Handler } from "express";
import { ZodError, ZodSchema } from "zod";

// middleware to validate request body using zod scehma
export const verifySchema = (ShemaDef: ZodSchema): Handler => {
  console.log("verifying request body");
  return (req, res, next) => {
    try {
      // parse and validate request body
      ShemaDef.parse(req.body);
      console.log("request body verified");
      next();
    } catch (err) {
      // handle zod errors
      if (err instanceof ZodError) {
        res.json({
          isSuccess: false,
          errors: err,
        });
      }
    }
  };
};
