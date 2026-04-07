//! create an express server and check if it's working

import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // cross origin resource sharing (browser blocks the request which comes from anywhere but localhost:8000)
// 1) we are importing express module which we installed using npm i

import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
import { connectDB } from "./config/database-config.js";

// Load environment variables
dotenv.config();

// 2) call/invoke the function
let app = express(); // object = {listen}

// Add middleware for parsing JSON
app.use(express.json());

// CORS configuration for development
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use("/api/auth", userRoutes); // http://localhost:9001/api/auth/signup
app.use("/api/sessions", sessionRoutes); // http://localhost:9001/api/sessions/create
app.use("/api/ai", aiRoutes); // http://localhost:9001/api/ai/generate-questions

// 3) Connect to database and start server
connectDB().catch((error) => {
  console.log("⚠️ Database connection failed:", error.message);
  console.log("Server starting anyway...");
});

app.listen(9001, () => {
  console.log("✅ Server Started on port 9001.....");
});
// app.listen(PORT_NUMBER, callback)

//! to check if the server is running, in cmd(git bash), goto backend folder and type "npx nodemon index.js"
// open browser -> localhost:PORT_NUMBER and press enter

// https://nodejs.org/en/ (/) =>  this is base url
// https://nodejs.org/en/blog => /blog is one endpoint
// https://nodejs.org/en/download

// https://github.com/Sarvesh-1999/NIGHT-CODING-MARATHON