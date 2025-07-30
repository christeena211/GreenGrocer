const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");
const Book = require("../models/Book");
// Drop all products and reseed new products
const dropAndReseedProducts = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://jasionchristeena:QTS2ACYtsQQOSuHB@cluster0.jvxjo0t.mongodb.net/greengrocery?retryWrites=true&w=majority"
    );
    // Remove all products
    await Product.deleteMany({});
    console.log("✅ All old products deleted");
    // Find a seller
    const seller = await User.findOne({ role: "seller" });
    if (!seller) {
      throw new Error("No seller found. Please seed sellers first.");
    }
    // New products to insert (add more as needed)
    const products = [
      {
        name: "Tomato",
        category: "Vegetable",
        price: 2.5,
        stock: 100,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        description: "Fresh tomatoes",
        sellerId: seller._id,
      },
      {
        name: "Potato",
        category: "Vegetable",
        price: 1.5,
        stock: 200,
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        description: "Organic potatoes",
        sellerId: seller._id,
      },
      {
        name: "Carrot",
        category: "Vegetable",
        price: 2.0,
        stock: 150,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
        description: "Crunchy carrots",
        sellerId: seller._id,
      },
      {
        name: "Broccoli",
        category: "Vegetable",
        price: 3.0,
        stock: 80,
        image: "https://images.unsplash.com/photo-1518976024611-4886d7a7d57b",
        description: "Fresh broccoli florets",
        sellerId: seller._id,
      },
      {
        name: "Cucumber",
        category: "Vegetable",
        price: 1.8,
        stock: 120,
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
        description: "Cool cucumbers",
        sellerId: seller._id,
      },
      {
        name: "Spinach",
        category: "Vegetable",
        price: 2.2,
        stock: 90,
        image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d",
        description: "Leafy spinach",
        sellerId: seller._id,
      },
      {
        name: "Onion",
        category: "Vegetable",
        price: 1.7,
        stock: 180,
        image: "https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e",
        description: "Red onions",
        sellerId: seller._id,
      },
      {
        name: "Bell Pepper",
        category: "Vegetable",
        price: 2.8,
        stock: 110,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
        description: "Colorful bell peppers",
        sellerId: seller._id,
      },
      {
        name: "Eggplant",
        category: "Vegetable",
        price: 2.3,
        stock: 70,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
        description: "Glossy eggplants",
        sellerId: seller._id,
      },
      {
        name: "Cauliflower",
        category: "Vegetable",
        price: 2.9,
        stock: 60,
        image: "https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e",
        description: "White cauliflower",
        sellerId: seller._id,
      },
      {
        name: "Green Beans",
        category: "Vegetable",
        price: 2.1,
        stock: 130,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
        description: "Tender green beans",
        sellerId: seller._id,
      },
      {
        name: "Peas",
        category: "Vegetable",
        price: 2.4,
        stock: 140,
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
        description: "Sweet green peas",
        sellerId: seller._id,
      },
      {
        name: "Cabbage",
        category: "Vegetable",
        price: 1.9,
        stock: 100,
        image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d",
        description: "Fresh cabbage",
        sellerId: seller._id,
      },
      {
        name: "Pumpkin",
        category: "Vegetable",
        price: 3.2,
        stock: 50,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
        description: "Sweet pumpkin",
        sellerId: seller._id,
      },
      {
        name: "Radish",
        category: "Vegetable",
        price: 1.6,
        stock: 90,
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        description: "Crisp radishes",
        sellerId: seller._id,
      },
      {
        name: "Sweet Corn",
        category: "Vegetable",
        price: 2.7,
        stock: 75,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        description: "Golden sweet corn",
        sellerId: seller._id,
      },
      {
        name: "Beetroot",
        category: "Vegetable",
        price: 2.6,
        stock: 85,
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        description: "Red beetroot",
        sellerId: seller._id,
      },
      {
        name: "Okra",
        category: "Vegetable",
        price: 2.0,
        stock: 95,
        image: "https://images.unsplash.com/photo-1518976024611-4886d7a7d57b",
        description: "Fresh okra",
        sellerId: seller._id,
      },
      {
        name: "Bitter Gourd",
        category: "Vegetable",
        price: 2.3,
        stock: 60,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
        description: "Healthy bitter gourd",
        sellerId: seller._id,
      },
      {
        name: "Bottle Gourd",
        category: "Vegetable",
        price: 2.1,
        stock: 70,
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
        description: "Tender bottle gourd",
        sellerId: seller._id,
      },
      {
        name: "Zucchini",
        category: "Vegetable",
        price: 2.8,
        stock: 65,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
        description: "Green zucchini",
        sellerId: seller._id,
      },
    ];
    await Product.insertMany(products);
    console.log(
      `✅ ${products.length} new products seeded and linked to seller ${
        seller.email || seller.username
      }`
    );
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error dropping/reseeding products:", error);
    await mongoose.disconnect();
  }
};

// Create default admin and user
const createDefaultUsers = async () => {
  try {
    const adminExists = await User.findOne({ username: "admin" });
    if (!adminExists) {
      const admin = new User({
        username: "admin",
        password: "admin123",
        role: "admin",
      });
      await admin.save();
      console.log("✅ Admin created - username: admin, password: admin123");
    }

    const userExists = await User.findOne({ username: "student" });
    if (!userExists) {
      const user = new User({
        username: "student",
        password: "student123",
        role: "user",
      });
      await user.save();
      console.log(
        "✅ Student user created - username: student, password: student123"
      );
    }
  } catch (error) {
    console.error("Error creating users:", error);
  }
};

// Simple database seeding
const seedDatabase = async () => {
  try {
    await createDefaultUsers();

    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      const books = [
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Fiction",
          description: "A classic American novel",
          price: 20,
          image: "https://via.placeholder.com/200x300",
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
          description: "A story of moral growth",
          price: 15,
          image: "https://via.placeholder.com/200x300",
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
          description: "A dystopian future society",
          price: 18,
          image: "https://via.placeholder.com/200x300",
        },
      ];

      await Book.insertMany(books);
      console.log("✅ Sample books added");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = {
  seedDatabase,
  dropAndReseedProducts,
};

// To run this script directly from terminal:
// node utils/seeder.js dropAndReseedProducts
if (require.main === module) {
  const arg = process.argv[2];
  if (arg === "dropAndReseedProducts") {
    dropAndReseedProducts();
  } else {
    seedDatabase();
  }
}
