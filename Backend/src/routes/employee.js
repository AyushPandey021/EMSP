import express from "express";
import { login, verify } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee,upload } from "../controllers/employeeController.js";

const router = express.Router();

// Login route
router.post("/add",authMiddleware,upload.single('image'),addEmployee)

export default router;
