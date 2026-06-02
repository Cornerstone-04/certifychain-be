import type { FileArray, UploadedFile } from "express-fileupload";
import type { Helia } from "helia";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error.js";
import { uploadFile } from "./uploadRep.js";

export async function uploadToIpfs(files: FileArray, helia: Helia) {
  const file = files.file;

  if (!file) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Expected a file field named "file"');
  }

  if (Array.isArray(file)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Only one file can be uploaded at a time");
  }

  return uploadFile(file as UploadedFile, helia);
}
