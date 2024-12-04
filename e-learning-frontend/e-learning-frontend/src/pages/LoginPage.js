import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after successful login
import "./LoginPage.css"; // Import CSS for styling

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // To display error message
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate(); // For navigation after successful login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      console.log("User logged in:", result);

      // Store the token and role in localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      localStorage.setItem("user", result.name);
      localStorage.setItem("instructor", result._id);

      // Redirect to dashboard or home page after successful login
      navigate("/"); // Change the path as needed
    } catch (error) {
      setError(error.message || "Error logging in");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Log In</h2>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Display error message */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
