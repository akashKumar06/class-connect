import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  createFolder,
  getFolderById,
  getFolderHierarchy,
  getFolders,
} from "../controllers/folder.controller.js";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/create-folder",
  [
    body("name")
      .isLength({ min: 1 })
      .withMessage("Folder name cannot be empty"),
  ],
  authUser,
  createFolder
);

router.get("/", authUser, getFolders);
router.get("/:id", authUser, getFolderById);
router.get("/hierarchy/:id", authUser, getFolderHierarchy);

export default router;