const Course = require("../models/Course");

// Create Course (Instructors Only)
const createCourse = async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { title, description, lessons } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      lessons,
      instructor: req.user.id, // Use authenticated user ID
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: "Error creating course" });
  }
};

// Get Courses (Accessible to All)
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email"); // Populate instructor details
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

// Update Course (Instructors Only)
const updateCourse = async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: "Error updating course" });
  }
};

// Delete Course (Instructors Only)
const deleteCourse = async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting course" });
  }
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
