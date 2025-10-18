import express from "express";
import { 
  makePrediction, 
  getPredictionHistory, 
  getPredictionStats 
} from "../controllers/predictionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/predict", protect, makePrediction);
router.get("/history", protect, getPredictionHistory);
router.get("/stats", protect, getPredictionStats);

export default router;