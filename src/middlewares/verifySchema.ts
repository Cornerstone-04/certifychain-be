import type { Handler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodSchema } from "zod";

export const verifySchema = (schema: ZodSchema): Handler => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          isSuccess: false,
          errors: err.flatten(),
        });
        return;
      }

      next(err);
    }
  };
};
