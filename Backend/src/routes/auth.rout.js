import express from "express";
import { login, verify } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Login route
router.post("/login", login);

// Verify token route (protected)
router.get("/verify", authMiddleware, verify);

export default router;
