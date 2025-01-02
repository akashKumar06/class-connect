import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateAvatar,
  updatePassword,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("username must be atleast 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("firstname must be atleast 3 characters long"),
  ],
  register
);

router.post("/login", login);

router.get("/profile", authUser, getProfile);
router.get("/logout", authUser, logout);
router.patch("/update-avatar", upload.single("avatar"), authUser, updateAvatar);
router.patch("/update-password", authUser, updatePassword);
export default router;
