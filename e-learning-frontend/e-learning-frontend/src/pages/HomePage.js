import React, { useState, useEffect } from "react";
import { fetchCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import "./HomePage.css";
import CoursePage from "./CoursePage";

const HomePage = () => {
  const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const getCourses = async () => {
  //     const data = await fetchCourses();
  //     setCourses(data);
  //   };
  //   getCourses();
  // }, []);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Our Learning Platform</h1>
        <p>Explore and enroll in courses tailored to your learning needs!</p>
      </header>
      <main>
        <CoursePage />
        <div className="course-list">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
