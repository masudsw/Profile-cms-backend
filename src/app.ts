import compression from "compression";
import cors from "cors";
import express from "express";
import cookiParser from "cookie-parser"
import { userRouter } from "./modules/user/user.routes";

import { authRouter } from "./modules/auth/auth.routes";
import { ProjectRouter } from "./modules/project/project.routes";
import { postRouter } from "./modules/post/post.router";

const app = express();


app.use(compression()); 


app.use(
  cors({
    origin:"https://portfolio-frontend-virid-one.vercel.app",
    credentials: true,
  })
);
app.use(express.json()); 
app.use(cookiParser())
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", ProjectRouter)

app.get("/", (_req, res) => {
  res.send("API is running");
});


app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
