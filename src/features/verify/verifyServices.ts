import { Helia } from "helia";
import { CID } from "multiformats";
import { getFile } from "./VerifyRepository";

// return true for any given hash (placeholder logic)
export function verifyHash(hash: string) {
  return true;
}

// retrieve file from IPFS using CID and Helia node

export async function GetFile(cid: string, helia: Helia) {
  // parse string CID into CID object
  const c = CID.parse(cid);
  console.log(c);
  return getFile(c, helia);
}
