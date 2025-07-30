const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { setCurrentUser, clearCurrentUser } = require("../middleware/auth");

// Simple login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    setCurrentUser(user);

    res.json({
      message: "Login successful",
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Simple logout
router.post("/logout", (req, res) => {
  clearCurrentUser();
  res.json({ message: "Logged out successfully" });
});

// Register new user

// Register new user (optionally as admin)
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters" });
    }

    if (password.length < 3) {
      return res
        .status(400)
        .json({ error: "Password must be at least 3 characters" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const user = new User({
      username,
      password,
      role: role === "admin" ? "admin" : "user",
    });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
