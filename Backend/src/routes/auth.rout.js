import express, { Router } from 'express';
import { login,verify } from '../controllers/authController.js';
import {authmiddleware} from "../middleware/authMiddleware.js"



const router = express.Router();

router.post('/login', login);
router.post('/varify',authmiddleware,verify)

export default router;
