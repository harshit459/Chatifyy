import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

export const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});

// Map of userId -> socketId for online user tracking
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // broadcast updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

httpServer.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}...`);
    connectDB();
});