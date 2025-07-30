// src/components/Header.js

import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { itemContext } from "../context/ItemContext";
import {
  getCurrentUser,
  isAdmin,
  logout as authLogout,
} from "../services/authService";

const Header = () => {
  const { itemsInCart, totalPrice } = useContext(itemContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Use authService helpers for login state
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoggedIn(!!currentUser);
    setAdmin(isAdmin());
  }, [location]);

  const handleLogout = () => {
    authLogout();
    setUser(null);
    setIsLoggedIn(false);
    setAdmin(false);
    alert("Logged out successfully!");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-gray-800 text-2xl font-black tracking-wider hover:text-blue-600 transition-colors"
          >
            VEGETABLE STORE
          </Link>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link
            to="/"
            className={`font-medium text-sm tracking-wider transition-colors ${
              isActive("/") || isActive("/home")
                ? "text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            HOME
          </Link>
          <Link
            to="/products"
            className={`font-medium text-sm tracking-wider transition-colors ${
              isActive("/products")
                ? "text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            PRODUCTS
          </Link>
          <Link
            to="/about"
            className="text-gray-600 font-medium text-sm tracking-wider hover:text-blue-500 transition-colors"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 font-medium text-sm tracking-wider hover:text-blue-500 transition-colors"
          >
            CONTACT
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <span className="text-gray-700 text-sm font-semibold">
              Total: ${totalPrice}
            </span>
          </div>

          {/* Login/Logout Section */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 text-sm">
                  Welcome, {user?.username || user?.name}{" "}
                  {admin ? "(Admin)" : ""}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-500 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-500 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="relative cursor-pointer">
            <Link
              to="/cart"
              className="text-gray-700 text-xl hover:text-blue-500 transition-colors relative"
            >
              🛒
              {itemsInCart > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemsInCart}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
