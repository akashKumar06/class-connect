import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import BlackListToken from "../models/blacklistToken.model.js";
import ApiError from "../utils/apiError.js";
async function authUser(req, res, next) {
  try {
    const token =
      req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];
    if (!token) throw new ApiError("Token not found", 401);

    const isBlacklistedToken = await BlackListToken.findOne({ token });
    if (isBlacklistedToken) {
      throw new ApiError("Unauthorized", 401);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new ApiError("Unauthorized", 401);

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 400)
      .json({ success: false, message: error?.message });
  }
}
async function authCR(req, res, next) {
  try {
    const user = req.user;
    if (!user?.isCR) throw new ApiError("Unauthorized", 401);

    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 400)
      .json({ success: false, message: error?.message });
  }
}
export { authUser, authCR };
