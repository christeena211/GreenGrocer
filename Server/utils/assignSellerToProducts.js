// Script to assign a sellerId to all products that don't have one
const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");

const MONGO_URI =
  "mongodb+srv://jasionchristeena:nte0W38oNw1LhzzC@cluster0.jvxjo0t.mongodb.net/greengrocery?retryWrites=true&w=majority";

async function assignSeller() {
  await mongoose.connect(MONGO_URI);
  // Find the first seller user
  const seller = await User.findOne({ role: "seller" });
  if (!seller) {
    console.log("No seller found in the database.");
    process.exit(1);
  }
  // Update all products without a sellerId
  const result = await Product.updateMany(
    { $or: [{ sellerId: { $exists: false } }, { sellerId: null }] },
    { $set: { sellerId: seller._id } }
  );
  console.log(
    `Updated ${result.modifiedCount} products with sellerId ${seller._id}`
  );
  await mongoose.disconnect();
}

assignSeller();
