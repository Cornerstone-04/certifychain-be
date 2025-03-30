import { ifError } from "assert";
import { Handler } from "express";
import { ZodError, ZodSchema } from "zod";

const verifySchema = (ShemaDef: ZodSchema): Handler => {
  return (req, res, next) => {
    try {
      ShemaDef.parse(req.body);
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
