import { Helia } from "helia";
import { CID } from "multiformats";
import { getFile } from "./VerifyRepository.js";

export async function GetFile(cid: string, helia: Helia) {
  const c = CID.parse(cid);
  console.log(c);
  return getFile(c, helia);
}
