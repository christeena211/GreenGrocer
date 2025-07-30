
require('dotenv').config(); // Load environment variables at the very top
// Seeder modules
const seedVegetables = require("./seeder/seedVegetables");
const seedUsers = require("./seeder/seedUsers");
// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
// const products = require("./products.js");
const productRoutes = require("./routes/products");

const MONGODB_URI = process.env.mongodb_url;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set. Please check your .env file.");
  process.exit(1);
}
// Use MongoDB Atlas connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));


mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully");
});

mongoose.connection.on("error", (err) => {
  console.error(" MongoDB connection error:", err);
  console.log(
    "💡 Make sure MongoDB is running locally or check your Atlas credentials"
  );
});

mongoose.connection.on("disconnected", () => {
  console.log(" Disconnected from MongoDB");
});

app.use(express.json());
app.use(cors()); // Use the cors middleware

// Product model and schema moved to models/Product.js

// Use User model from models/User.js
const User = require("./models/User");

// Remove old product seeding logic. Use new Product model and routes.

// Use new product routes

app.use("/api/products", productRoutes);

// Helpful GET handler for /api/login
app.get("/api/login", (req, res) => {
  res
    .status(405)
    .json({ error: "Please use POST to /api/login with email and password." });
});

// AUTHENTICATION ROUTES

// Register new user
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email or username already exists" });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password, // In production, hash the password
      phone,
      address,
    });

    await user.save();
    console.log(` New user registered: ${username}`);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(" Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login user
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (user) console.log("DB password:", user.password);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Plain text password check
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    console.log(` User logged in: ${user.username}`);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(" Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get user profile
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(" Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Get all users (admin only, with password - for debugging only!)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // includes password
    console.log(`Found ${users.length} users (with passwords)`);
    res.json(users);
  } catch (error) {
    console.error(" Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Run seeders
seedUsers();
seedVegetables();

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
