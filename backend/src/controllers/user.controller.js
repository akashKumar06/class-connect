import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import User from "../models/user.model.js";

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
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    const { username, email, password } = req.body;

    if (!username && !email) throw new Error("Username or Email is required.");
    if (!password) throw new Error("Password is required.");

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new Error({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error({ message: "Invalid email or password" });

    const token = user.generateToken();
    return res.status(200).json({
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
export { register, login };
