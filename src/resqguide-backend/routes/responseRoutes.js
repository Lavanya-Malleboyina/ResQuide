const express = require("express");
const router = express.Router();
const {
  submitResponse,
  getResponses
} = require("../controllers/responseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, submitResponse);
router.get("/:buildingId", protect, getResponses);

module.exports = router;
