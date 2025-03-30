import { z } from "zod";

const uploadSchema = z.object({
  name: z.string().min(0).max(1024),
  content: z.string().default(""),
});
