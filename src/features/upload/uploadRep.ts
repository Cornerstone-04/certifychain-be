import { unixfs } from "@helia/unixfs";
import { createReadStream } from "node:fs";
import type { UploadedFile } from "express-fileupload";
import type { Helia } from "helia";

export async function uploadFile(file: UploadedFile, helia: Helia) {
  const fs = unixfs(helia);

  if (file.tempFilePath) {
    const cid = await fs.addByteStream(createReadStream(file.tempFilePath));
    return cid.toString();
  }

  const cid = await fs.addBytes(file.data);
  return cid.toString();
}
