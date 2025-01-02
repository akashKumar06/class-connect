import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) throw new Error("local file path not provided.");
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "ClassConnect",
    });
    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    if (localFilePath) fs.unlinkSync(localFilePath);
    throw error;
  }
}

export { uploadOnCloudinary };
