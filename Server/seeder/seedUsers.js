// Seeder for admin and dummy users
const User = require("../models/User");

const seedAdminUsers = async () => {
  const adminUsers = [
    { username: "admin1", email: "admin1@example.com", password: "adminpass1" },
    { username: "admin2", email: "admin2@example.com", password: "adminpass2" },
    { username: "admin3", email: "admin3@example.com", password: "adminpass3" },
    { username: "admin4", email: "admin4@example.com", password: "adminpass4" },
    { username: "admin5", email: "admin5@example.com", password: "adminpass5" },
  ];
  for (const adminData of adminUsers) {
    let existingAdmin = await User.findOne({ username: adminData.username });
    if (!existingAdmin) {
      const admin = new User({
        username: adminData.username,
        email: adminData.email,
        password: adminData.password,
        role: "admin",
      });
      await admin.save();
      console.log(
        `Admin user created: username=${adminData.username}, password=${adminData.password}`
      );
    } else {
      if (!existingAdmin.password) {
        existingAdmin.password = adminData.password;
        existingAdmin.email = adminData.email;
        await existingAdmin.save();
        console.log(`Admin user password updated to: ${adminData.password}`);
      } else {
        console.log(`Admin user already exists: ${adminData.username}`);
      }
    }
  }
};

const seedDummyUsers = async () => {
  const dummyUsers = [
    {
      username: "dummyuser1",
      email: "dummy1@example.com",
      password: "pass1dummy",
    },
    {
      username: "dummyuser2",
      email: "dummy2@example.com",
      password: "pass2dummy",
    },
    {
      username: "dummyuser3",
      email: "dummy3@example.com",
      password: "pass3dummy",
    },
    {
      username: "dummyuser4",
      email: "dummy4@example.com",
      password: "pass4dummy",
    },
    {
      username: "dummyuser5",
      email: "dummy5@example.com",
      password: "pass5dummy",
    },
  ];
  for (const du of dummyUsers) {
    const existing = await User.findOne({ username: du.username });
    if (!existing) {
      const user = new User({
        username: du.username,
        email: du.email,
        password: du.password,
        role: "user",
      });
      await user.save();
      console.log(
        `Dummy user created: username=${du.username}, password=${du.password}`
      );
    } else {
      console.log(`Dummy user already exists: ${du.username}`);
    }
  }
};

const seedSellerUsers = async () => {
  const sellerUsers = [
    {
      username: "seller1",
      email: "seller1@seller.com",
      password: "sellerpass1",
    },
    {
      username: "seller2",
      email: "seller2@seller.com",
      password: "sellerpass2",
    },
    {
      username: "seller3",
      email: "seller3@seller.com",
      password: "sellerpass3",
    },
    {
      username: "seller4",
      email: "seller4@seller.com",
      password: "sellerpass4",
    },
    {
      username: "seller5",
      email: "seller5@seller.com",
      password: "sellerpass5",
    },
  ];
  for (const sellerData of sellerUsers) {
    let existingSeller = await User.findOne({ username: sellerData.username });
    if (!existingSeller) {
      const seller = new User({
        username: sellerData.username,
        email: sellerData.email,
        password: sellerData.password,
        role: "seller",
      });
      await seller.save();
      console.log(
        `Seller user created: username=${sellerData.username}, password=${sellerData.password}`
      );
    } else {
      // Always update email to match seeder, and update password if missing
      let updated = false;
      if (existingSeller.email !== sellerData.email) {
        existingSeller.email = sellerData.email;
        updated = true;
      }
      if (!existingSeller.password) {
        existingSeller.password = sellerData.password;
        updated = true;
      }
      if (updated) {
        await existingSeller.save();
        console.log(`Seller user updated: username=${sellerData.username}, email=${sellerData.email}`);
      } else {
        console.log(`Seller user already exists: ${sellerData.username}`);
      }
    }
  }
};

const seedUsers = async () => {
  await seedAdminUsers();
  await seedSellerUsers();
  await seedDummyUsers();
};

module.exports = seedUsers;
