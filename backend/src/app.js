import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import folderRouter from "./routes/folder.routes.js";
import fileRouter from "./routes/file.routes.js";
import classRouter from "./routes/class.routes.js";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/folders", folderRouter);
app.use("/api/files", fileRouter);
app.use("/api/classes", classRouter);

export default app;
