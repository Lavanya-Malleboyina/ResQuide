const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("admin"), createQuestion);
router.get("/", getQuestions);
router.put("/:id", protect, authorizeRoles("admin"), updateQuestion);
router.delete("/:id", protect, authorizeRoles("admin"), deleteQuestion);

module.exports = router;
