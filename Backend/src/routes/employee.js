import express from "express";
import multer from "multer";
import path from "path";
import { addEmployee, getEmployee } from "../controllers/employee.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import fs from 'fs';

// ✅ Multer setup
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join( 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Route
router.get("/", authMiddleware, getEmployee);

router.post("/add", upload.single("image"), addEmployee);

export default router;
