import React, { useContext, useEffect, useState } from "react";
import { itemContext } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const Cart = () => {
  const { items, totalPrice, removeFromCart, updateQuantity } =
    useContext(itemContext);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      alert("Please login to access your cart.");
      navigate("/login");
    }
  }, [navigate]);

  const handlePayment = () => {
    setPaymentSuccess(true);
    // Optionally, clear cart or perform other actions here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {paymentSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded text-center font-semibold">
          Payment successful! Thank you for your purchase.
        </div>
      )}
      {items && items.length > 0 && !paymentSuccess ? (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">${item.price} each</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="ml-4 text-red-500 hover:underline"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
              <div className="font-bold text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-end mt-6 gap-4">
            <div className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : !paymentSuccess ? (
        <div className="text-gray-500 text-center py-12">
          Your cart is empty.
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
