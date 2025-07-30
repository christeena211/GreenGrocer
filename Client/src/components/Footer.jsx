import React from "react";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-6 mt-12">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-2 md:mb-0">
        <span className="font-bold text-lg">GreenGrocery</span> &copy;{" "}
        {new Date().getFullYear()}
      </div>
      <div className="text-sm text-gray-300">
        Fresh vegetables delivered to your door. All rights reserved.
      </div>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/products" className="hover:underline">
          Products
        </a>
        <a href="/login" className="hover:underline">
          Login
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
