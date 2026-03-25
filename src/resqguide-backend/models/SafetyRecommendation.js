const mongoose = require("mongoose");

const safetyRecommendationSchema = new mongoose.Schema({

  riskLevel: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"]
  },

  recommendation: {
    type: String,
    required: true
  },

  category: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("SafetyRecommendation", safetyRecommendationSchema);
