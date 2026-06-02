import { pathToFileURL } from "node:url";
import { createApp } from "./app.js";
import { getHelia, stopHelia } from "./helia.js";

const app = createApp();

export async function startServer(): Promise<void> {
  await getHelia();

  const port = Number(process.env.PORT ?? 3000);
  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  const shutdown = async () => {
    server.close();
    await stopHelia();
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  startServer().catch((error: unknown) => {
    console.error("Failed to start server", error);
    process.exitCode = 1;
  });
}

export default app;
