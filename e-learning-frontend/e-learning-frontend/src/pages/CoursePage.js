import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CoursePage.css";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    lessons: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const instructorId = localStorage.getItem("instructor");

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleViewVideo = (videoUrl) => {
    setSelectedVideo(videoUrl); // Set the selected video URL
  };

  const closeVideoModal = () => {
    setSelectedVideo(null); // Clear the selected video
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch {
        setError("Failed to fetch courses. Please try again.");
      }
    };
    fetchCourses();
  }, [token]);

  const handleCreateCourse = async () => {
    if (userRole !== "instructor")
      return alert("Only instructors can create courses.");
    if (!newCourse.title || !newCourse.description || !newCourse.lessons)
      return alert("All fields are required.");

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses",
        { ...newCourse, instructor: instructorId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses([...courses, response.data]);
      setNewCourse({ title: "", description: "", lessons: "" });
    } catch {
      setError("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (id) => {
    if (userRole !== "instructor")
      return alert("Only instructors can update courses.");

    const title = prompt(
      "Enter new title:",
      courses.find((course) => course._id === id)?.title
    );
    const description = prompt(
      "Enter new description:",
      courses.find((course) => course._id === id)?.description
    );
    const lessons = prompt(
      "Enter lessons (comma-separated):",
      courses.find((course) => course._id === id)?.lessons.join(", ")
    );

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/courses/${id}`,
        { title, description, lessons: lessons.split(",") },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(
        courses.map((course) =>
          course._id === id ? { ...course, ...response.data } : course
        )
      );
    } catch {
      setError("Failed to update course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (userRole !== "instructor")
      return alert("Only instructors can delete courses.");

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(courses.filter((course) => course._id !== id));
    } catch {
      setError("Failed to delete course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-page">
      {error && <div className="error-message">{error}</div>}

      {userRole === "instructor" && (
        <div className="course-creation">
          <h2>Create a New Course</h2>
          <input
            type="text"
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
          />
          <textarea
            placeholder="Lessons (comma-separated URLs)"
            value={newCourse.lessons}
            onChange={(e) =>
              setNewCourse({ ...newCourse, lessons: e.target.value })
            }
          />
          <button onClick={handleCreateCourse} disabled={loading}>
            {loading ? "Creating..." : "Create Course"}
          </button>
        </div>
      )}

      <h2 className="section-title">Available Courses</h2>
      <div className="course-list">
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="lesson-videos">
                {course.lessons.map((lesson, index) => (
                  <div key={index} className="lesson-container">
                    <button
                      onClick={() => handleViewVideo(lesson)}
                      className="view-button"
                    >
                      View Lesson
                    </button>
                  </div>
                ))}
              </div>
              <p style={{ color: "black", fontWeight: "900" }}>
                Instructor: {course.instructor?.name || "Unknown"}
              </p>
              {userRole === "instructor" && (
                <div className="course-actions">
                  <button
                    onClick={() => handleUpdateCourse(course._id)}
                    disabled={loading}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal for Viewing Video */}
      {selectedVideo && (
        <div className="video-modal">
          <div className="modal-content">
            <iframe
              width="100%"
              height="400px"
              src={selectedVideo}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <button className="close-modal" onClick={closeVideoModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
