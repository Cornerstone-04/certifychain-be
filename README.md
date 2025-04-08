# IPFS-Based Certification Verification System

A Node.js and Express-based backend service that serves as a proof-of-concept for a blockchain-based certification system. It enables secure file uploads to IPFS using Helia and allows verification of stored content using CIDs (Content Identifiers). This structure forms a foundational layer for building anti-fraud mechanisms around digital certificates.

---

## 🚀 Features

- Upload files to IPFS
- Retrieve files using CID
- Validate requests using Zod
- Use Helia (modern IPFS client) and UnixFS for file handling
- Provide clean HTTP responses with proper status codes
- Custom error handling

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **Helia** (`helia`, `@helia/unixfs`)
- **Zod** (runtime schema validation)
- **IPFS** via UnixFS
- **http-status-codes**

---

## 📂 Project Structure

```bash
├── main.ts                # Entry point, Express setup & server start
├── error.ts               # Custom AppError class
├── middlewares/
│   └── verifySchema.ts    # Middleware for validating request bodies
├── schema/
│   └── index.ts           # Upload schema using Zod
├── features/
│   ├── upload/
│   │   ├── uploadHandler.ts     # Express route for /upload
│   │   ├── uploadServices.ts    # Upload business logic
│   │   └── uploadRep.ts         # Actual Helia file upload logic
│   └── verify/
│       ├── verifyHandlers.ts    # Express route for /verify
│       ├── verifyService.ts     # Helper function for getting files
│       └── VerifyRepository.ts  # Actual Helia file retrieval logic
```

---

## 📮 API Endpoints

### `GET /upload`

- Health check route

### `POST /upload/upload`

- **Body:**

```json
{
  "name": "example.txt",
  "content": "Hello, IPFS!"
}
```

- **Response:**

```json
{
  "isSuccess": true,
  "cid": "<cid-string>"
}
```

### `GET /verify`

- Health check route

### `POST /verify/getFile`

- **Body:**

```json
{
  "hash": "<cid-string>"
}
```

- **Response:**

```json
{
  "isSuccess": true,
  "file": <streamed-content>
}
```

---

## 🧪 Running the Project

1. **Install dependencies**

```bash
pnpm install
```

2. **Compile & watch your TypeScript files.**

```bash
pnpm run devbuild
```

3. **Start the server**

```bash
pnpm run dev
```

> Server runs on `http://localhost:3000`

---

## 🧠 Notes

- This project uses in-memory logic and direct logging; it can be extended to persist metadata or files elsewhere.
- Helia must be running and have proper DHT support to retrieve content reliably across IPFS.

---

### 📄 **Project Summary**

**Title:** Implementation of a Blockchain-Based Certification System to Prevent Degree Fraud

This project is a backend service built using **TypeScript** and the **Express.js** framework, serving as a proof-of-concept for a blockchain-based certification system. It enables the decentralized storage and verification of digital certificates to combat degree fraud.

The system uses **Helia**, a modern implementation of IPFS (InterPlanetary File System), to upload and retrieve files securely using unique CIDs (Content Identifiers). These files can be later verified without alteration, ensuring the authenticity and integrity of academic documents.

---

### 🧰 **Tech Stack**

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage Protocol**: IPFS (via Helia)
- **Validation**: Zod (runtime schema validation)
- **File Upload**: Multer
- **HTTP Utilities**: http-status-codes

---

### 📦 **Core Dependencies**

```bash
helia
@helia/unixfs
@helia/http
multiformats
express
zod
multer
dotenv
```

### ⚙️ **Dev Dependencies**

```bash
typescript
nodemon
@types/node
@types/express
@types/multer
```

---
