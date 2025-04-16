import { z } from "zod";

export const uploadSchema = z.object({
  name: z.string().min(0).base64(),
  content: z.string().min(0),
});
