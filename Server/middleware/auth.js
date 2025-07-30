// Simple session storage (in production, use proper session store)
let currentUser = null;

// Simple middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (!currentUser) {
    return res.status(401).json({ error: "Please login first" });
  }
  req.user = currentUser;
  next();
};

// Simple middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!currentUser || currentUser.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Helper functions to manage current user
const setCurrentUser = (user) => {
  currentUser = user;
};

const getCurrentUser = () => {
  return currentUser;
};

const clearCurrentUser = () => {
  currentUser = null;
};

module.exports = {
  isLoggedIn,
  isAdmin,
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
};
