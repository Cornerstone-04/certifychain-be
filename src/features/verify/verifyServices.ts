import type { Helia } from "helia";
import { CID } from "multiformats/cid";
import { getFile } from "./VerifyRepository.js";

export function getFileByCid(cid: string, helia: Helia) {
  return getFile(CID.parse(cid), helia);
}
