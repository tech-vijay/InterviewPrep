import express from "express";
import { protect } from "../middlewares/auth-middleware.js";
import {
  generateInterviewQuestions,
  generateConceptExplanation,
} from "../controller/ai-controller.js";

const router = express.Router();

// AI Routes
router.post("/generate-questions", protect, generateInterviewQuestions); // Generate interview questions
router.post("/generate-explanation", protect, generateConceptExplanation); // Generate concept explanation

export default router;
