import compression from "compression";
import cors from "cors";
import express from "express";
import cookiParser from "cookie-parser"
import { userRouter } from "./modules/user/user.routes";

import { authRouter } from "./modules/auth/auth.routes";
import { ProjectRouter } from "./modules/project/project.routes";
import { postRouter } from "./modules/post/post.router";

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(cookiParser())
app.use(express.json()); // Parse incoming JSON requests


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", ProjectRouter)
// Default route for testing
app.get("/", (_req, res) => {
  res.send("API is running");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
