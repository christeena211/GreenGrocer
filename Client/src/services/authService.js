// Get the current user from localStorage
export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Check if the current user is an admin
export function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === "admin";
}

// Logout the current user
export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
}
