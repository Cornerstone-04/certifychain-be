import { Helia } from "helia";

import { UploadedFile, FileArray } from "express-fileupload";
import { uploadFile } from "./uploadRep.js";

// upload file to IPFS using Helia and return CID
export async function uploadToIpfs(files: FileArray, helia: Helia) {
  // call uploadFile to store file in IPFS
  const cid = await uploadFile(files.file as UploadedFile, helia);
  // return generated CID
  return cid;
}
