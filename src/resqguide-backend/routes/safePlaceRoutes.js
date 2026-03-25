const express = require("express");
const router = express.Router();
const {
  createSafePlace,
  getSafePlaces,
  getSafePlaceById,
  deleteSafePlace
} = require("../controllers/safePlaceController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("admin"), createSafePlace);
router.get("/", getSafePlaces);
router.get("/:id", getSafePlaceById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteSafePlace);

module.exports = router;
