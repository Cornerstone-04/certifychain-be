import { Helia } from "helia";
import { unixfs } from "@helia/unixfs";

async function uploadFile(
  file: { content: string; name: string },
  helia: Helia
) {
  const fs = unixfs(helia);

  const u = Uint8Array.from(Buffer.from(file.content));
  const cid = await fs?.addBytes(u);

  return cid?.toString();
}

export { uploadFile };
