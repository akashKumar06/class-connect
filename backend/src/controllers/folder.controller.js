import { validationResult } from "express-validator";
import Folder from "../models/folder.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

async function createFolder(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });

    const parentId = req.query.parentId;
    const { name } = req.body;
    if (!name) throw new ApiError("Folder name cannot be empty", 400);

    let parent = null;
    if (parentId !== undefined) parent = parentId;

    // create a folder
    const folder = await Folder.create({ name, parent });

    // if parent folder is present
    if (parentId !== undefined) {
      const mainFolder = await Folder.findById(parentId);
      mainFolder.folders.push(folder._id);
      await mainFolder.save();
    } else {
      // insert this folder in the user folder's list if parent is not present
      const user = await User.findById(req.user._id);
      user.folders.push(folder);
      await user.save();
    }
    return res
      .status(200)
      .json({ success: true, message: "Folder created successfully.", folder });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getFolders(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .populate("folders")
      .populate("files");
    if (!user) throw new ApiError("User not found", 400);
    return res.status(200).json({
      success: true,
      folders: user.folders,
      files: user.files,
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

async function getFolderById(req, res) {
  try {
    const folder = await Folder.findById(req.params.id)
      .populate("folders")
      .populate("files");

    if (!folder) throw new ApiError("Folder not found", 400);
    return res.status(200).json({
      success: true,
      folder,
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

async function getFolderHierarchy(req, res) {
  const id = req.params.id;
  if (!id) return res.status(200).json({ success: true, array: [] });

  const array = [];
  async function rec(id) {
    if (id === null) {
      return;
    }

    const folder = await Folder.findById(id);
    array.unshift({ name: folder.name, id: folder._id });
    await rec(folder.parent);
  }

  await rec(id);
  return res.status(200).json({ success: true, array });
}

export { createFolder, getFolders, getFolderById, getFolderHierarchy };
