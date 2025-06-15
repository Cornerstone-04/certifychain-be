import { Helia } from "helia";
import { CID } from "multiformats";
import { getFile } from "./VerifyRepository.js";

export async function GetFile(cid: string, helia: Helia) {
  const c = CID.parse(cid);
  console.log("inside the service function");
  return getFile(c, helia);
}
