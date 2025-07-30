import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleViewVegetables = () => {
    navigate("/products");
  };
  return (
    <section className="relative h-screen bg-gradient-to-br from-green-100 via-white to-lime-100 overflow-hidden">
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-gray-800">
              <p className="text-sm font-semibold tracking-wider mb-4 text-green-700">
                FRESH FROM THE FARM
              </p>

              <h1 className="text-7xl lg:text-8xl font-black leading-none mb-6">
                <span className="text-green-700">VEGETABLE</span>
                <br />
                <span className="text-gray-800">Store</span>
              </h1>

              <h2 className="text-4xl font-light mb-8 text-lime-600">2025</h2>

              <p className="text-lg mb-8 max-w-md text-gray-600">
                Discover the freshest and healthiest vegetables delivered
                straight to your door. Eat well, live well, and enjoy nature's
                best every day!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="bg-gradient-to-r from-green-300 via-green-200 to-lime-200 text-green-900 px-8 py-4 rounded-lg font-semibold border border-green-200 shadow-md hover:from-green-400 hover:to-lime-300 hover:text-green-800 transition-colors"
                  onClick={handleViewVegetables}
                >
                  View Vegetables
                </button>
              </div>
            </div>

            {/* Right Content - Vegetable Image */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-8xl">🥦</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 text-green-700 text-sm font-semibold opacity-70">
        FRESH VEGGIES
      </div>
    </section>
  );
};

export default HeroSection;
