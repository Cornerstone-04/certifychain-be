# CertifyChain Backend

Proof-of-concept Express API for storing academic certificates in IPFS with
Helia. Uploaded files receive a content identifier (CID). Retrieving the file
with that CID provides a byte-for-byte verification path: modifying a
certificate changes its CID.

This repository is the storage and verification layer of the concept. It does
not currently write certificate metadata or CIDs to a blockchain.

## Requirements

- Node.js 20 or newer
- Bun or npm

## Setup

```bash
bun install
bun run build
bun run start
```

The server listens on `http://localhost:3000` by default. Set `PORT` to override
the port. Helia stores local blocks and datastore state under `./ipfs/`. Set
`IPFS_DATA_PATH` to use a different storage directory.

## API

### Health checks

```text
GET /
GET /upload
GET /verify
```

### Upload a certificate

```text
POST /upload
Content-Type: multipart/form-data
```

Send one file in a multipart field named `file`. Files are limited to 10 MiB.

```bash
curl -F "file=@certificate.pdf" http://localhost:3000/upload
```

Example response:

```json
{
  "isSuccess": true,
  "cid": "bafy..."
}
```

### Retrieve and verify a certificate

```text
POST /verify/getFile
Content-Type: application/json
```

```json
{
  "hash": "bafy...",
  "fileType": "application/pdf",
  "fileName": "certificate.pdf"
}
```

Only `hash` is required. The response streams the stored bytes as a download.

## Development

```bash
bun run check
bun run build
bun run dev
```

## Render

This repository includes a `render.yaml` Blueprint. For an existing Render web
service, use these settings in the Render dashboard:

```text
Build Command: npm install && npm run build
Start Command: npm start
NODE_VERSION: 22.22.0
```

Render filesystems are ephemeral by default. For certificates to remain
available after redeploys or restarts, attach a persistent disk and set
`IPFS_DATA_PATH` to a directory on that disk, such as `/var/data/ipfs`.
