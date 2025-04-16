type FileType = {
  path: string;
  content: Uint8Array;
};

import { Helia } from "helia";
import { unixfs } from "@helia/unixfs";

// upload a file to IPFS using Helia node
async function uploadFile(
  file: { content: string; name: string },
  helia: Helia
) {
  // create UnixFS instance from Helia
  const fs = unixfs(helia);

  const u = Uint8Array.from(Buffer.from(file.content));
  const cid = await fs?.addBytes(u);

  return cid?.toString();
}

export { uploadFile };
