const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your actual secret from environment variables
    console.log("Decoded token:", decoded); // Debug the decoded token

    // Fetch the user based on the ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach the full user object to `req.user`
    next();
  } catch (err) {
    console.error("JWT verification error:", err); // Log any errors
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;
