const express = require("express");
const router = express.Router();
const { calculateRisk, getRiskHistory } = require("../controllers/riskController");
const { protect } = require("../middleware/authMiddleware");

router.post("/calculate", protect, calculateRisk);
router.get("/history", protect, getRiskHistory);

module.exports = router;
