import { ifError } from "assert";
import { Handler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodSchema } from "zod";

// middleware to validate request body using zod scehma
export const verifySchema = (ShemaDef: ZodSchema): Handler => {
  return (req, res, next) => {
    try {
      // parse and validate request body
      ShemaDef.parse(req.body);
      next();
    } catch (err) {
      // handle zod errors
      if (err instanceof ZodError) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          isSuccess: false,
          errors: err,
        });
      }
    }
  };
};
