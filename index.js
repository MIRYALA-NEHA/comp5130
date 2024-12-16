import express from "express";
import https from 'https';
import fs from 'fs';
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import logger from "./middlewares/logger.js";
import connectDB from "./config/db.js";

// Import routers
import userRouter from "./Routes/user.js";
import authRouter from "./Routes/auth.js";
import courseRouter from "./Routes/course.js";
import communityRouter from "./Routes/community.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// CORS settings
app.use(cors());
app.use(express.json());

// Winston-based HTTP request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Connect to MongoDB
connectDB();

// HTTPS server options
const options = {
  key: fs.readFileSync('./certificate.key'),
  cert: fs.readFileSync('./certificate.crt')
};

// Create HTTPS server
https.createServer(options, app).listen(8000, () => {
  logger.info("HTTPS server running on port 8000");
});

// Root route
app.get("/", (req, res) => {
  logger.info("Root route accessed");
  res.send("Welcome to CourseHub!");
});

// Routers
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/course", courseRouter);
app.use("/community", communityRouter);

// Error handler middleware (optional)
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).send("Something went wrong!");
});
