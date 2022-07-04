import { registerUser, loginUser } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);

export default router;