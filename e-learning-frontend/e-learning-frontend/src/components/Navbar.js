import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file for styling

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Load user and role from localStorage on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("role");

      if (storedUser) setUser(storedUser); // Directly set the user string
      if (storedRole) setRole(storedRole); // Directly set the role string
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>
          <Link to="/" className="navbar-logo">
            E-Learning
          </Link>
        </h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li className="navbar-welcome">Welcome, {user}</li>
            {role && <li className="navbar-role">Role: {role}</li>}
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
