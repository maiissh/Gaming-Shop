import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Category from "./components/category/category";
import Order from "./components/order/order";
import Product from "./components/product/product";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<div className="page-content"><Category /></div>} />
        <Route path="/products" element={<div className="page-content"><Product /></div>} />
        <Route path="/order" element={<div className="page-content"><Order /></div>} />
      </Routes>
    </Router>
  );
}

export default App;