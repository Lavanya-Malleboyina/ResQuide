const express = require("express");
const router = express.Router();
const {
  createAlert,
  getAlerts,
  getAlertById,
  deleteAlert
} = require("../controllers/alertController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("admin"), createAlert);
router.get("/", getAlerts);
router.get("/:id", getAlertById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteAlert);

module.exports = router;
