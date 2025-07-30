// Seeder for vegetable products
const Product = require("../models/Product");

const seedVegetables = async () => {
  const count = await Product.countDocuments();
  if (count >= 20) {
    console.log("Vegetable products already seeded.");
    return;
  }
  const vegetables = [
    {
      name: "Tomato",
      category: "Vegetable",
      price: 30,
      stock: 100,
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
      description: "Fresh red tomatoes.",
    },
    {
      name: "Potato",
      category: "Vegetable",
      price: 25,
      stock: 120,
      image:
        "https://images.unsplash.com/photo-1518976024611-4886d1b7c7a5?auto=format&fit=crop&w=400&q=80",
      description: "Organic potatoes.",
    },
    {
      name: "Onion",
      category: "Vegetable",
      price: 40,
      stock: 90,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      description: "Crisp onions.",
    },
    {
      name: "Carrot",
      category: "Vegetable",
      price: 35,
      stock: 80,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80",
      description: "Sweet carrots.",
    },
    {
      name: "Cabbage",
      category: "Vegetable",
      price: 20,
      stock: 60,
      image:
        "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
      description: "Green cabbage.",
    },
    {
      name: "Cauliflower",
      category: "Vegetable",
      price: 45,
      stock: 70,
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
      description: "Fresh cauliflower.",
    },
    {
      name: "Brinjal",
      category: "Vegetable",
      price: 30,
      stock: 50,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      description: "Purple brinjal.",
    },
    {
      name: "Spinach",
      category: "Vegetable",
      price: 15,
      stock: 40,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80",
      description: "Leafy spinach.",
    },
    {
      name: "Beans",
      category: "Vegetable",
      price: 50,
      stock: 60,
      image:
        "https://images.unsplash.com/photo-1518976024611-4886d1b7c7a5?auto=format&fit=crop&w=400&q=80",
      description: "Green beans.",
    },
    {
      name: "Peas",
      category: "Vegetable",
      price: 55,
      stock: 55,
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
      description: "Sweet peas.",
    },
    {
      name: "Pumpkin",
      category: "Vegetable",
      price: 20,
      stock: 30,
      image:
        "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
      description: "Yellow pumpkin.",
    },
    {
      name: "Bitter Gourd",
      category: "Vegetable",
      price: 35,
      stock: 25,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80",
      description: "Healthy bitter gourd.",
    },
    {
      name: "Bottle Gourd",
      category: "Vegetable",
      price: 28,
      stock: 22,
      image:
        "https://images.unsplash.com/photo-1518976024611-4886d1b7c7a5?auto=format&fit=crop&w=400&q=80",
      description: "Fresh bottle gourd.",
    },
    {
      name: "Drumstick",
      category: "Vegetable",
      price: 60,
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      description: "Nutritious drumstick.",
    },
    {
      name: "Ladies Finger",
      category: "Vegetable",
      price: 38,
      stock: 35,
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
      description: "Green ladies finger.",
    },
    {
      name: "Cucumber",
      category: "Vegetable",
      price: 22,
      stock: 45,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80",
      description: "Cool cucumber.",
    },
    {
      name: "Radish",
      category: "Vegetable",
      price: 18,
      stock: 28,
      image:
        "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
      description: "White radish.",
    },
    {
      name: "Beetroot",
      category: "Vegetable",
      price: 32,
      stock: 32,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80",
      description: "Red beetroot.",
    },
    {
      name: "Green Chilli",
      category: "Vegetable",
      price: 70,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      description: "Spicy green chilli.",
    },
    {
      name: "Coriander",
      category: "Vegetable",
      price: 10,
      stock: 50,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80",
      description: "Fresh coriander leaves.",
    },
  ];
  await Product.insertMany(vegetables);
  console.log("Seeded 20 vegetable products.");
};

module.exports = seedVegetables;
