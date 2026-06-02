import { FsBlockstore } from "blockstore-fs";
import { LevelDatastore } from "datastore-level";
import { createHelia, type Helia } from "helia";
import { join } from "node:path";

let heliaPromise: Promise<Helia> | undefined;

async function initializeHelia(): Promise<Helia> {
  const dataPath = process.env.IPFS_DATA_PATH ?? "./ipfs";
  const blockstore = new FsBlockstore(join(dataPath, "blockstore"));
  const datastore = new LevelDatastore(join(dataPath, "datastore"));
  let helia: Helia | undefined;

  await datastore.open();

  try {
    helia = await createHelia({ blockstore, datastore, start: false });
    await helia.start();
    return helia;
  } catch (error) {
    await Promise.allSettled([
      helia?.stop(),
      blockstore.close(),
      datastore.close(),
    ]);
    throw error;
  }
}

export function getHelia(): Promise<Helia> {
  heliaPromise ??= initializeHelia().catch((error: unknown) => {
    heliaPromise = undefined;
    throw error;
  });

  return heliaPromise;
}

export async function stopHelia(): Promise<void> {
  if (!heliaPromise) {
    return;
  }

  const helia = await heliaPromise;
  await helia.stop();
  heliaPromise = undefined;
}
