const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const User = require("../models/User");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

// Add new book (admin only)
router.post("/books", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { title, author, genre, description, price, image } = req.body;

    // Basic validation
    if (!title || !author || !price) {
      return res
        .status(400)
        .json({ error: "Title, author, and price are required" });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    const book = new Book({
      title,
      author,
      genre: genre || "General",
      description: description || "No description available",
      price: Number(price),
      image: image || "https://via.placeholder.com/200x300",
    });

    await book.save();
    res.json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// Update book (admin only)
router.put("/books/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    if (price !== undefined && (isNaN(price) || price <= 0)) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Delete book (admin only)
router.delete("/books/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Get all users (admin only)
router.get("/users", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
