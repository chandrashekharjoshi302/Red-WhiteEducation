import axios from "axios";
import API from "./api";

export const fetchCourses = async () => {
  const { data } = await API.get("/courses");
  return data;
};

export const createCourse = async (courseData) => {
  const { data } = await axios.post("/api/courses", courseData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
};

export const updateCourse = async (id, updatedData) => {
  const { data } = await axios.put(`/api/courses/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
};

export const deleteCourse = async (id) => {
  const { data } = await axios.delete(`/api/courses/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
};
