import Prediction from "../models/Prediction.js";
import User from "../models/User.js";
import axios from "axios";

export const makePrediction = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Content is required" 
      });
    }

    // Call Flask API
    const flaskResponse = await axios.post(
      process.env.FLASK_API_URL + "/predict", 
      { content }
    );
    const { result, confidence } = flaskResponse.data;

    // Save prediction to database
    const prediction = await Prediction.create({
      userId,
      content,
      result,
      confidence
    });

    // Add prediction to user's predictions
    await User.findByIdAndUpdate(userId, {
      $push: { predictions: prediction._id }
    });

    res.status(201).json({
      success: true,
      prediction
    });
  } catch (error) {
    console.error("Prediction error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to make prediction. Ensure Flask server is running." 
    });
  }
};

export const getPredictionHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const predictions = await Prediction.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      predictions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPredictionStats = async (req, res) => {
  try {
    const userId = req.userId;

    const predictions = await Prediction.find({ userId });
    const totalPredictions = predictions.length;
    const realCount = predictions.filter(p => p.result === "Real").length;
    const fakeCount = predictions.filter(p => p.result === "Fake").length;
    const avgConfidence = predictions.length > 0
      ? (predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length * 100).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalPredictions,
        realCount,
        fakeCount,
        accuracy: `${avgConfidence}%`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

