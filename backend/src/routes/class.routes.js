import express from "express";
import { body } from "express-validator";
import {
  addStudentToClass,
  createClass,
  deleteStudentFromClass,
  editClass,
  getClass,
  getClasses,
} from "../controllers/class.controller.js";
import { authCR, authUser } from "../middlewares/auth.middleware.js";
const router = express.Router();

// create class - /classes
router.post(
  "/",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Class name must be at least 3 character long"),
    body("startYear").isInt().withMessage("Invalid year"),
    body("endYear").isInt().withMessage("Invalid year"),
    body("department")
      .isLength({ min: 1 })
      .withMessage("Depratment cannot be empty"),
  ],
  authUser,
  authCR,
  createClass
);

//getClasses given a class name
router.get("/", authUser, getClasses);

// get class - /classes/:id
router.get("/:id", authUser, getClass);

// edit class - /classes/:id
router.patch("/:id", authUser, authCR, editClass);

// remove student from class - /classes/:classId/:studentid
router.delete("/:studentId", authUser, authCR, deleteStudentFromClass);

// add student to class - /classes/:studentid
router.patch("/:classId/:studentId", authUser, authCR, addStudentToClass);

export default router;
