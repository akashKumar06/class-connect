import { validationResult } from "express-validator";
import Class from "../models/class.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

async function createClass(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }
    const { name, startYear, endYear, department } = req.body;
    if (!name || !startYear || !endYear || !department)
      throw new ApiError("All fields are required", 400);

    const isAlreadyCreated = await Class.findOne({ admin: req.user._id });
    if (isAlreadyCreated) throw new ApiError("Class is already created.", 400);

    const cls = await Class.create({
      admin: req.user._id,
      name,
      startYear,
      endYear,
      department,
    });

    await User.findByIdAndUpdate(req.user._id, { class: cls._id });

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: cls,
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error?.message,
    });
  }
}

async function getClass(req, res) {
  try {
    const { id } = req.params;
    if (!id) throw new ApiError("Class ID is required", 400);

    const cls = await Class.findById(id);
    if (!cls) throw new ApiError("Class not found", 404);

    const students = await User.find({ class: id });

    return res.status(200).json({
      success: true,
      message: "Class fetched successfully",
      data: { class: cls, students },
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error?.message,
    });
  }
}

async function editClass(req, res) {
  try {
    const { id } = req.params;
    const { name, startYear, endYear, department } = req.body;
    if (!id) throw new ApiError("Class ID is required", 400);

    const cls = await Class.findById(id);
    if (!cls) throw new Error("Class not found", 404);

    if (name) cls.name = name;
    if (startYear) cls.startYear = startYear;
    if (endYear) cls.endYear = endYear;
    if (department) cls.department = department;
    await cls.save();
    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: cls,
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error?.message,
    });
  }
}

async function deleteStudentFromClass(req, res) {
  try {
    const { studentId } = req.params;
    if (!studentId) throw new ApiError("Student ID is required", 404);

    const student = await User.findById(studentId);
    if (!student) throw new Error("Student not found", 404);

    student.class = null;
    await student.save();
    return res.status(200).json({
      success: true,
      message: "Student removed from class successfully",
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error?.message,
    });
  }
}

async function getClasses(req, res) {
  try {
    const { query } = req.query;
    const classes = await Class.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });

    return res.status(200).json({
      success: true,
      classes,
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error?.message,
    });
  }
}

async function joinClass(req, res) {
  try {
    const { studentId, classId } = req.params;
    if (!studentId || !classId)
      throw new ApiError("studentId and classId required", 400);

    const cls = await Class.findById(classId);
    if (!cls) throw new ApiError("Not a valid class", 400);
    const stu = await User.findById(studentId);
    if (!stu) throw new ApiError("Not a valid student", 400);

    cls.requests.push(stu._id);
    stu.hasJoined = "pending";
    stu.class = cls._id;

    await cls.save();
    await stu.save();

    return res.status(200).json({
      success: true,
      message: "Requested successfully",
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
}

async function handleClassRequest(req, res) {
  try {
    const { classId, studentId, status } = req.params;

    if (!classId) throw new ApiError("classId is required", 400);
    const cls = await Class.findById(classId);
    if (!cls) throw new ApiError("Not a valid class.", 404);

    if (!cls.requests.includes(studentId))
      throw new ApiError("Not a valid student.", 400);

    const stu = await User.findById(studentId);
    if (!stu) throw new ApiError("Not a valid Student.", 404);

    stu.hasJoined = status;
    cls.requests.filter((req) => req !== stu._id);

    await stu.save();
    await cls.save();

    return res.status(200).json({
      success: true,
      message: "Student added successfully.",
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
}

export {
  createClass,
  getClasses,
  getClass,
  editClass,
  deleteStudentFromClass,
  handleClassRequest,
  joinClass,
};
