import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './src/Db.js';

import authRouter from "./src/routes/auth.rout.js";
import departmentRouter from "./src/routes/department.js";
import employee from "./src/routes/employee.js";

const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware setup
app.use(cors()); // Enable CORS for all domains (can be restricted later)
app.use(express.json()); // Parse incoming JSON requests
app.use(express.static('public/uploads')); // Serve static files (images, etc.) from 'public/uploads'

// Routes
app.use("/api/auth", authRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/employee", employee);

// Root route for server health check
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server has been started at Port ${process.env.PORT} ✅`);
});
