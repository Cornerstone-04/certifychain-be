import { Helia } from "helia";
import { uploadFile } from "./uploadRep.js";

export async function uploadToIpfs(
  file: { name: string; content: string },
  helia: Helia
) {
  const cid = await uploadFile(file, helia);
  return cid;
}
