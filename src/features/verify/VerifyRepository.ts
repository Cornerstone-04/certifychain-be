import { unixfs } from "@helia/unixfs";
import { Helia } from "helia";
import { CID } from "multiformats/dist/src";

export async function getFile(cid: CID, helia: Helia) {
  const fs = unixfs(helia);
  const chunks = [];
  console.log("inside the repository function");
  try {
    for await (const i of fs.cat(cid)) {
      console.log("hello");
      console.log(i);
      chunks.push(i);
    }
  } catch (err) {
    console.log(err);
  }

  return chunks;
}
