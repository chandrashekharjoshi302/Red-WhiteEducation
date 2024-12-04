import React from "react";
import "./CourseCard.css"; // Import CSS file for styling

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-content">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>
        <button className="enroll-btn">Enroll Now</button>
      </div>
    </div>
  );
};

export default CourseCard;
