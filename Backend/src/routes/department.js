import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js";
import { addDepartment, deleteDepartment, editDepartment, getDepartmentById, getDepartments } from '../controllers/departmentController.js';


const router = express.Router();

// 👉 Remove extra /department here
router.get("/", authMiddleware, getDepartments);
router.post("/add", authMiddleware, addDepartment);
// router.post("/:id", authMiddleware, editDepartment);
router.get("/:id", authMiddleware, getDepartmentById);
router.put("/:id", authMiddleware, editDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);
// routes/departmentRoutes.js




export default router;
