const SafetyRecommendation = require("../models/SafetyRecommendation");

exports.getRecommendations = async (req, res) => {
  try {
    const { riskLevel } = req.params;
    const recommendations = await SafetyRecommendation.find({ riskLevel });
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createRecommendation = async (req, res) => {
  try {
    const recommendation = await SafetyRecommendation.create(req.body);
    res.status(201).json(recommendation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await SafetyRecommendation.find();
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await SafetyRecommendation.findByIdAndDelete(req.params.id);
    if (!recommendation) {
      return res.status(404).json({ message: "Recommendation not found" });
    }
    res.json({ message: "Recommendation deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
