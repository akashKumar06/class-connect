import { validationResult } from "express-validator";
import Class from "../models/class.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { io, userMap } from "../socket.js";

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

    await User.findByIdAndUpdate(req.user._id, {
      class: cls._id,
      hasJoined: "accepted",
    });

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

    const isRequested = await Class.findOne({
      requests: studentId,
    });

    if (isRequested)
      throw new ApiError("Already requested. Wait for approval.", 400);

    const stu = await User.findById(studentId);
    if (!stu) throw new ApiError("Not a valid student", 400);

    cls.requests.push(stu._id);
    stu.hasJoined = "pending";
    stu.class = cls._id;

    await cls.save();
    await stu.save();

    // send the realtime joining to the CR
    // get the cr socket id
    const crSocketId = userMap.get(cls.admin.toString());
    io.to(crSocketId).emit("class_join");

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
    cls.requests = cls.requests.filter((req) => req === stu._id);

    await stu.save();
    await cls.save();

    const stuSocketId = userMap.get(stu._id);
    if (stuSocketId) io.to(stuSocketId).emit("class_joined");

    return res.status(200).json({
      success: true,
      message: "status updated successfully.",
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getClassRequests(req, res) {
  try {
    const classId = req.params.id;
    if (!classId) throw new ApiError("classId not found.");

    const cls = await Class.findById(classId).populate("requests");
    if (!cls) throw new ApiError("class not found.", 404);
    return res.status(200).json({
      success: true,
      data: cls,
    });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
}

async function postNotification(req, res) {
  try {
    const { message } = req.body;

    if (!message) throw new ApiError("message cannot be empty", 400);
    const user = req.user;
    if (!user.class) throw new ApiError("Not a valid user", 400);

    const classId = user.class;
    const cls = await Class.findById(classId);
    cls.notifications.push({ message });
    await cls.save();

    io.emit(
      "class_notification",
      cls.notifications[cls.notifications.length - 1]
    );

    return res.status(200).json({ notifications: cls.notifications });
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json({ message: error?.message || "Internal server error" });
  }
}

async function getNotifications(req, res) {
  try {
    const user = req.user;
    if (!user.class) throw new ApiError("Not a valid user", 400);

    const cls = await Class.findById(user.class);
    if (!cls) throw new ApiError("Class not found.", 400);

    return res.status(200).json({ notifications: cls.notifications });
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json({ message: error?.message || "Internal server error" });
  }
}

async function deleteNotifications(req, res) {
  try {
    const { classId, id } = req.params;
    if (!classId) throw new ApiError("No class found", 400);
    const cls = await Class.findByIdAndUpdate(
      classId,
      {
        $pull: { notifications: { _id: id } },
      },
      { new: true }
    );

    io.emit("delete_notification", id);

    return res.status(200).json({ notifications: cls.notifications });
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json({ message: error?.message || "Internal server error" });
  }
}

async function getAllStudentsOfClass(req, res) {
  try {
    const { classId } = req.params;
    const students = await User.find({ class: classId });
    return res.status(200).json({ students });
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json({ message: error?.message || "Internal server error" });
  }
}

async function leaveClass(req, res) {
  try {
    const id = req.user._id;
    //  update the state of the user hasJoined = "not requested" and make class = null
    const user = await User.findByIdAndUpdate(
      id,
      {
        hasJoined: "not_requested",
        class: null,
      },
      { new: true }
    );
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res
      .status(error?.statusCode || 500)
      .json({ message: error?.message || "Internal server error" });
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
  getClassRequests,
  postNotification,
  getNotifications,
  deleteNotifications,
  getAllStudentsOfClass,
  leaveClass,
};
