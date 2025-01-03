import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import User from "../models/user.model.js";
import BlackListToken from "../models/blacklistToken.model.js";
import ApiError from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }
    const { username, email, password, fullname } = req.body;
    const user = await createUser({
      username,
      email,
      password,
      fullname,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) throw new Error("Username or Email is required.");
    if (!password) throw new ApiError("Password is required.", 400);

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new ApiError("Invalid email or password", 400);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError("Invalid email or password", 400);

    const token = user.generateToken();

    return res.status(200).cookie("token", token).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    return res
      .status(error?.statusCode || 400)
      .json({ success: false, message: error?.message });
  }
}

async function getProfile(req, res) {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return res
      .status(error?.statusCode || 400)
      .json({ success: false, message: error?.message });
  }
}

async function logout(req, res) {
  try {
    const token = req.token;
    await BlackListToken.create({ token });

    return res
      .status(200)
      .clearCookie("token")
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res
      .status(error?.statusCode || 400)
      .json({ success: false, message: error?.message });
  }
}

async function updateAvatar(req, res) {
  try {
    const avatar = req.file;
    const user = req.user;
    const cloudinaryRes = await uploadOnCloudinary(avatar.path);
    user.avatar = cloudinaryRes.url;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "avatar updated successfully",
      user,
    });
  } catch (error) {
    return res
      .status(error?.statusCode || 400)
      .json({ success: false, message: error?.message });
  }
}

async function updatePassword(req, res) {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword)
      throw new ApiError("All fields are required", 400);
    const user = req.user;
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) throw new ApiError("password is incorrect.", 400);

    user.password = newPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(error?.statusCode || 400).json({
      success: false,
      message: error?.message,
    });
  }
}

export { register, login, getProfile, logout, updateAvatar, updatePassword };
