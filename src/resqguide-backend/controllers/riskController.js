const RiskAssessment = require("../models/RiskAssessment");

const calculateRisk = async (req, res) => {
  try {
    const { answers, buildingId } = req.body;

    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ message: "No answers provided" });
    }

    let riskScore = 0;

    Object.values(answers).forEach((value) => {
      if (value === "None" || value === "Blocked" || value === "Poor") riskScore += 10;
      else if (value === "Basic" || value === "Limited" || value === "Average") riskScore += 5;
      else if (value === "Adequate" || value === "Good") riskScore += 2;
      else if (value === "Advanced" || value === "Well-marked" || value === "Excellent") riskScore += 0;
    });

    let riskLevel = "Low";
    if (riskScore > 40) riskLevel = "High";
    else if (riskScore > 20) riskLevel = "Medium";

    const recommendations = [];

    if (riskLevel === "Low") {
      recommendations.push("Maintain current safety standards");
      recommendations.push("Schedule annual safety inspections");
    }
    if (riskLevel === "Medium") {
      recommendations.push("Improve safety equipment standards");
      recommendations.push("Ensure all emergency exits are clearly marked and unobstructed");
      recommendations.push("Train staff and occupants on emergency procedures");
    }
    if (riskLevel === "High") {
      recommendations.push("Install fire extinguishers immediately on every floor");
      recommendations.push("Create and post a detailed emergency evacuation plan");
      recommendations.push("Conduct regular safety drills at least once per quarter");
      recommendations.push("Inspect and repair all electrical systems immediately");
      recommendations.push("Engage a certified structural engineer to assess building integrity");
    }

    if (buildingId) {
      await RiskAssessment.create({ building: buildingId, riskScore, riskLevel });
    }

    res.json({ riskScore, riskLevel, recommendations });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Risk calculation failed" });
  }
};

const getRiskHistory = async (req, res) => {
  try {
    const assessments = await RiskAssessment.find().populate("building").sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { calculateRisk, getRiskHistory };
