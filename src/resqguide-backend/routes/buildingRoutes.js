const express = require("express");
const router = express.Router();
const {
  createBuilding,
  getBuildings,
  getBuildingById,
  updateBuilding,
  deleteBuilding
} = require("../controllers/buildingController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createBuilding);
router.get("/", protect, getBuildings);
router.get("/:id", protect, getBuildingById);
router.put("/:id", protect, updateBuilding);
router.delete("/:id", protect, deleteBuilding);

module.exports = router;
