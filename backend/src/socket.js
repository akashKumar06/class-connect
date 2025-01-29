import http from "http";
import app from "./app.js";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

const userMap = new Map();

io.on("connection", (socket) => {
  socket.on("login", (userId) => {
    userMap.set(userId, socket.id);
    console.log(userMap);
  });

  socket.on("logout", (userId) => {
    userMap.delete(userId);
    console.log(userMap);
  });
});

export { io, userMap };
export default server;
