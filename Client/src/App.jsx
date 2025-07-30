// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import ProductList from "./components/ProductList.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Cart from "./components/Cart.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import SellerDashboard from "./components/seller/SellerDashboard.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import CustomItemContext from "./context/ItemContext.jsx";
import "./App.css";

const App = () => {
  return (
    <CustomItemContext>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/home" element={<Home />} /> */}
              <Route path="/products" element={<ProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CustomItemContext>
  );
};

export default App;
