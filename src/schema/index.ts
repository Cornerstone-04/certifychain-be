// import Zod for validation
import { z } from "zod";

// define schema for validating upload request body
export const uploadSchema = z.object({
  // validate 'name' to be a string between 0 and 1024 characters
  name: z.string().min(0).max(1024),
  // validate 'content' to be a string with a minimum length of 0
  content: z.string().min(0),
});
