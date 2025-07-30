import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/authService";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Products", icon: "�" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/"); // Redirect to home page
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen relative">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-gray-400 text-sm">Event Management System</p>
      </div>

      <nav className="mt-8 pb-32">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-700 transition-colors ${
              activeTab === item.id
                ? "bg-gray-700 border-r-4 border-blue-500"
                : ""
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-800 rounded-lg p-4 mb-3">
          <p className="text-sm text-gray-400">Logged in as:</p>
          <p className="text-white font-medium">
            {currentUser?.user?.name || "Administrator"}
          </p>
          <p className="text-gray-400 text-xs">
            {currentUser?.user?.email || "admin@system.com"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors flex items-center justify-center"
        >
          <span className="mr-2">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
}
