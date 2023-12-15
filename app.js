import express from "express";
import userRouter from "./routes/User.js";
import taskRouter from "./routes/task.js";

import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

export const app = express(); //// 1.

config({
  path: "./data/config.env",
}); /////2.

// to access the body data middleware

app.use(express.json()); /////3.
app.use(cookieParser()); /////4.

app.use(
  ////8.
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// using routes
app.use("/api/v1/users", userRouter); /////5.
app.use("/api/v1/task", taskRouter); /////6.
// it is used for hosting purposes
// here specifying the alowed domain
app.get("/", (req, res) => {
  res.send("<h1>Hello everyone</h1>");
});

// error handling middleware
app.use(errorMiddleware); /////7.
