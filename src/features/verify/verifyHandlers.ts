import { Router } from "express";
import { GetFile } from "./verifyServices.js";
import App from "../../main.js";
import { StatusCodes } from "http-status-codes";

export const verifyRouter = Router();

verifyRouter.get("/", (req, res) => {
  res.json({
    message: "everywhere good",
  });
});

// define POST /getFile route to retrieve file from IPFS
verifyRouter.post("/getFile", async (req, res) => {
  // extract hash and optionally filename/fileType from request body
  const { hash, fileType, fileName } = req.body;

  console.log(hash);
  // retrieve file using hash and Helia instance
  console.log("getting the file");
  try {
    const file = await GetFile(hash, App.server.helia!);
    console.log("gotten the file");
    // console.log(file); // Avoid logging potentially large file data directly

    // Set Content-Type header
    // Use the provided fileType, or try to infer it, or default to application/octet-stream
    const contentType = fileType || "image/jpeg"; // Default for unknown binary files
    res.setHeader("Content-Type", contentType);

    // Set Content-Disposition header to prompt download
    // Use the provided fileName, or generate a generic one
    const dispositionFileName =
      fileName || `downloaded_file.${contentType.split("/")[1] || "bin"}`;
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${dispositionFileName}"`,
    );

    // Stream the file data to the response
    for (const chunk of file) {
      res.write(Buffer.from(chunk));
    }
    res.end(); // Important: signal the end of the response

    console.log("File sent for download.");
  } catch (error) {
    console.error("Error retrieving or sending file:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve or send file",
      error: (error as Record<string, string>).message,
    });
  }
});

export default { verifyRouter };
