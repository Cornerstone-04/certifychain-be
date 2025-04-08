import { Helia } from "helia";
import { uploadFile } from "./uploadRep.js";

// upload file to IPFS using Helia and return CID
export async function uploadToIpfs(
  file: { name: string; content: string },
  helia: Helia
) {
  // call uploadFile to store file in IPFS
  const cid = await uploadFile(file, helia);
  // return generated CID
  return cid;
}
