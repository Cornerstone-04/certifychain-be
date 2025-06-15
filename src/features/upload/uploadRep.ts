import { Helia } from "helia";
import { unixfs } from "@helia/unixfs";
import { readFile } from "fs/promises";
import { UploadedFile, FileArray } from "express-fileupload";
// upload a file to IPFS using Helia node
async function uploadFile(file: UploadedFile, helia: Helia) {
  // create UnixFS instance from Helia
  //
  console.log("uploading the file");
  const fs = unixfs(helia);

  const fileBuffer = await readFile(file.tempFilePath);

  const cid = await fs.addBytes(fileBuffer);

  return cid?.toString();
}

export { uploadFile };
