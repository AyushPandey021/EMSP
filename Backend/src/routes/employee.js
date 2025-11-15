import express from "express";
import multer from "multer";
import path from "path";
import { addEmployee, getEmployee, getEmployees } from "../controllers/employee.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import fs from "fs";


// ✅ Create an Express Router
const router = express.Router();

// ✅ Multer setup with file validation (Only images allowed)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join("public/uploads");

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Ensure unique file name to avoid overwriting
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Routes for Employee API
// GET all employees
router.get("/", authMiddleware, getEmployee);

// POST route to add a new employee with image upload
router.post("/add", upload.single("image"), addEmployee);
router.get('/:id', authMiddleware, getEmployee, getEmployees);

export default router;
