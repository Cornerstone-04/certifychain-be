import { unixfs } from "@helia/unixfs";
import type { Helia } from "helia";
import type { CID } from "multiformats/cid";

export function getFile(cid: CID, helia: Helia) {
  return unixfs(helia).cat(cid);
}
