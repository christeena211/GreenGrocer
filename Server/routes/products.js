const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

// Get all products (public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "username role");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get single product (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "sellerId",
      "username role"
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Add product (seller or admin)
router.post("/", async (req, res) => {
  try {
    // In a real app, get sellerId from auth middleware (req.user._id)
    const {
      name,
      brand,
      category,
      price,
      stock,
      image,
      description,
      sellerId,
    } = req.body;
    const product = new Product({
      name,
      brand,
      category,
      price,
      stock,
      image,
      description,
      sellerId,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to add product" });
  }
});

// Update product (seller or admin)
router.put("/:id", async (req, res) => {
  try {
    // In a real app, check if req.user is seller or admin and owns the product
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update product" });
  }
});

// Delete product (seller or admin)
router.delete("/:id", async (req, res) => {
  try {
    // In a real app, check if req.user is seller or admin and owns the product
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
