const mongoose = require("mongoose");

const riskSchema = new mongoose.Schema({

  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building"
  },

  riskScore: {
    type: Number
  },

  riskLevel: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.models.RiskAssessment ||
  mongoose.model("RiskAssessment", riskSchema);
