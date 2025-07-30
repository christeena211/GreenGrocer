// client/src/components/ProductItem.js

import React, { useContext } from "react";
import { itemContext } from "../context/ItemContext";

const ProductItem = ({ product }) => {
  const { addToCart, removeFromCart } = useContext(itemContext);

  const handleAddToCart = (product) => {
    console.log(product);
    addToCart(product);
  };

  const handleRemoveToCart = (product) => {
    console.log("product removed", product);
    removeFromCart(product);
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
      {/* Product Image */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={product.image}
          alt={product.name}
        />
        {product.stock <= 10 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Low Stock
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs">{product.brand}</p>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-yellow-400 text-xs">
              {renderStars(product.rating)}
            </span>
            <span className="text-gray-400 text-xs">({product.reviews})</span>
          </div>
          <p className="text-gray-600 text-xs">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-xs text-gray-500">Stock: {product.stock}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleAddToCart(product)}
            disabled={product.stock === 0}
            className="flex-1 bg-blue-500 text-white py-2 px-3 text-sm font-medium rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>

          <button
            onClick={() => handleRemoveToCart(product)}
            className="bg-gray-200 text-gray-700 py-2 px-3 text-sm rounded hover:bg-gray-300 transition-colors"
          >
            −
          </button>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between items-center pt-2 text-sm text-gray-500 border-t border-gray-100 mt-3">
          <span>Rating: {product.rating}/5</span>
          <span>{product.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
