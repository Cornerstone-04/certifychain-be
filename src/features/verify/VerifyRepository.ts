import { unixfs } from "@helia/unixfs";
import { Helia } from "helia";

export async function getFile(cid: any, helia: Helia) {
  // create UnixFS instance using Helia
  const fs = unixfs(helia);
  // stream file content from IPFS using CID
  const ct = await fs.cat(cid);

  // // (optional) process and buffer the full content
  // const chunks = [];
  // for await (const i of fs.cat(cid)) {
  //   console.log(i);
  //   chunks.push(i);
  // }
  // const fullFile = Uint8Array.from(chunks);
  // return Buffer.from(fullFile).toString("base64url");
  return ct;
}
