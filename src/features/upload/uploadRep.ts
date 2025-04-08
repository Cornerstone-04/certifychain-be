// define FileType for IPFS file structure
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

  // convert file content to Uint8Array and add it to IPFS
  const cid = await fs?.addFile({
    path: file.name,
    content: Uint8Array.from(file.content),
  });

  // return CID as string
  return cid?.toString();
}

export { uploadFile };
