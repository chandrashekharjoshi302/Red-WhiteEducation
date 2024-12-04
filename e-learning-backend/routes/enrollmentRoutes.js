const express = require("express");
const {
  enrollInCourse,
  getEnrollments,
  updateProgress,
} = require("../controllers/enrollmentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/enroll", protect, enrollInCourse);
router.get("/", protect, getEnrollments);
router.put("/progress", protect, updateProgress);

module.exports = router;
