const express = require("express");
const router = express.Router();
const {
  createBuildingType,
  getBuildingTypes,
  deleteBuildingType
} = require("../controllers/buildingTypeController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("admin"), createBuildingType);
router.get("/", getBuildingTypes);
router.delete("/:id", protect, authorizeRoles("admin"), deleteBuildingType);

module.exports = router;
