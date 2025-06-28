import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import main components
import NavBar from "./components/NavBar/NavBar";
import Category from "./components/category/category";
import Order from "./components/order/order";

import "./App.css";

function App() {
  return (
    <Router>
      {/* Top navigation bar with logo and cart */}
      <NavBar />

      {/* Define the routes for the app */}
      <Routes>
        {/* Home page displaying products */}
        <Route path="/" element={<Category />} />

        {/* Order page for reviewing and submitting the cart */}
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
