import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { addFile } from "../controllers/file.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", upload.single("file"), authUser, addFile);
export default router;
