import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (
      !user ||
      user.role !== "seller" ||
      !user.email.endsWith("@seller.com")
    ) {
      alert(
        "Access denied! Only sellers with @seller.com email can access this page."
      );
      navigate("/login");
      return;
    }
    fetchSellerProducts();
  }, [navigate]);

  const fetchSellerProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/products");
      // Only show products belonging to this seller (handle both string and object)
      const sellerProducts = response.data.filter((p) => {
        if (!p.sellerId) return false;
        // If populated (object), check _id; if string, compare directly
        if (typeof p.sellerId === "object" && p.sellerId._id) {
          return p.sellerId._id === currentUser.id;
        }
        return p.sellerId === currentUser.id;
      });
      setProducts(sellerProducts);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (data) => {
    try {
      // Attach sellerId
      const productData = { ...data, sellerId: currentUser.id };
      await axios.post("http://localhost:5000/api/products", productData);
      setShowProductForm(false);
      fetchSellerProducts();
    } catch (e) {
      alert("Error adding product");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleUpdateProduct = async (data) => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        { ...data, sellerId: currentUser.id }
      );
      setEditingProduct(null);
      setShowProductForm(false);
      fetchSellerProducts();
    } catch (e) {
      alert("Error updating product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchSellerProducts();
    } catch (e) {
      alert("Error deleting product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading Seller Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <p className="mb-4 text-gray-600">
        Welcome, {currentUser?.username} ({currentUser?.email})
      </p>
      <button
        onClick={() => {
          setShowProductForm(true);
          setEditingProduct(null);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Product
      </button>
      {showProductForm && (
        <ProductForm
          onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
          initial={editingProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.brand}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Simple ProductForm for seller (reuse from admin or define here)
function ProductForm({ onSave, initial, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    }
  );
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border p-2 rounded"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />
      </div>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 rounded w-full"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
