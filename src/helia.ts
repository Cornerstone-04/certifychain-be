import { FsBlockstore } from "blockstore-fs";
import { LevelDatastore } from "datastore-level";
import { createHelia, type Helia } from "helia";

let heliaPromise: Promise<Helia> | undefined;

async function initializeHelia(): Promise<Helia> {
  const blockstore = new FsBlockstore("./ipfs/blockstore");
  const datastore = new LevelDatastore("./ipfs/datastore");
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
