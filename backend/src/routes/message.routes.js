import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/:id", authUser, getMessage);
router.post("/:id", authUser, sendMessage);
export default router;
