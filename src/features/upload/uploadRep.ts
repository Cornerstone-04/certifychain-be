type FileType = {
  path: string;
  content: Uint8Array;
};

import { Helia } from "helia";
import { unixfs } from "@helia/unixfs";

async function uploadFile(
  file: { content: string; name: string },
  helia: Helia
) {
  const fs = unixfs(helia);
  const cid = await fs?.addFile({
    path: file.name,
    content: Uint8Array.from(file.content),
  });
  return cid?.toString();
}

export { uploadFile };
