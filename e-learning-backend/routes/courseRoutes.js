const express = require("express");
const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCourse); // Only instructors can create courses
router.get("/", protect, getCourses); // All users can fetch courses
router.put("/:id", protect, updateCourse); // Only instructors can update courses
router.delete("/:id", protect, deleteCourse); // Only instructors can delete courses

module.exports = router;
