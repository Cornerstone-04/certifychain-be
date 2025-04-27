// import Zod for validation
import { z } from "zod";

// define schema for validating upload request body
export const uploadSchema = z.object({
  // validate 'name' to be a string with a minimum length of 0 and base64 encoded
  name: z.string().min(0),
  // validate 'content' to be a string with a minimum length of 0
  content: z.string().min(0).base64(),
});
