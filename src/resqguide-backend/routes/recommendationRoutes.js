const express = require("express");
const router = express.Router();
const {
  getRecommendations,
  createRecommendation,
  getAllRecommendations,
  deleteRecommendation
} = require("../controllers/recommendationController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", protect, getAllRecommendations);
router.get("/:riskLevel", getRecommendations);
router.post("/", protect, authorizeRoles("admin"), createRecommendation);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRecommendation);

module.exports = router;
