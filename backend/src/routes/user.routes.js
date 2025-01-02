import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { body } from "express-validator";
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
export default router;
