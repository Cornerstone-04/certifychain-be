import { unixfs } from "@helia/unixfs";
import { Helia } from "helia";

export async function getFile(cid: any, helia: Helia) {
  const fs = unixfs(helia);
  const ct = await fs.cat(cid);
  // const chunks = [];
  // for await (const i of fs.cat(cid)) {
  //   console.log(i);
  //   chunks.push(i);
  // }
  // const fullFile = Uint8Array.from(chunks);
  // return Buffer.from(fullFile).toString("base64url");
  return ct;
}
