import { CID } from "multiformats/cid";
import { z } from "zod";

export const getFileSchema = z.object({
  hash: z.string().min(1, "A CID is required").refine((value) => {
    try {
      CID.parse(value);
      return true;
    } catch {
      return false;
    }
  }, "A valid CID is required"),
  fileType: z
    .string()
    .regex(/^[\w.+-]+\/[\w.+-]+$/, "A valid MIME type is required")
    .optional(),
  fileName: z.string().min(1).max(255).optional(),
});
