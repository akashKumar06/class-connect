import File from "../models/file.model.js";
import Folder from "../models/folder.model.js";
import ApiError from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function addFile(req, res) {
  try {
    const file = req.file;
    if (!file) throw new ApiError("File not found.", 400);

    const parentId = req.query.parentId;
    let parent = req.query.parentId;
    if (!parentId) parent = null;

    const cloudinaryResponse = await uploadOnCloudinary(file.path);

    const newFile = await File.create({
      url: cloudinaryResponse.url,
      resource_type: cloudinaryResponse.resource_type,
      format: cloudinaryResponse.format,
      original_filename: cloudinaryResponse.original_filename,
    });

    if (parent) {
      const fileParent = await Folder.findById(parentId);
      if (!fileParent) throw new ApiError("Folder not found", 400);
      fileParent.files.push(newFile._id);
      await fileParent.save();
      newFile.parent = parent;
    } else {
      const user = req.user;
      user.files.push(newFile._id);
      await user.save();
      newFile.parent = null;
    }

    await newFile.save();

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      newFile,
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      error: error?.message,
    });
  }
}

export { addFile };
