require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
console.log("Connecting to MongoDB URI:", mongoUri);
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.error("Initial connection error:", err));

async function createDummySeller() {
  const hashedPassword = await bcrypt.hash("sellerpassword", 10);
  await User.create({
    username: "dummyseller",
    email: "dummyseller@seller.com",
    password: hashedPassword,
    role: "seller",
  });
  console.log("Dummy seller created!");
  mongoose.disconnect();
}

createDummySeller();
