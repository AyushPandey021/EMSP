import express from "express";
import multer from "multer";
import path from "path";
import { addEmployee } from "../controllers/employee.controller.js";
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Route
router.post("/", authMiddleware, getEmployee);
router.post("/add", upload.single("image"), addEmployee);

export default router;
