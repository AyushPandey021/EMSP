import express from "express";
// import authMiddleware from "../middleware";
import { addSalary } from "../controllers/salaryController.js"; 
const router = express.Router();
 router.post("/add", addSalary);
    export default router;
    
