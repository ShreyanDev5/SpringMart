// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import EditProduct from "./pages/EditProduct"; // Placeholder
import Navbar from "./components/Navbar";
// Global styles are imported in index.js

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    
    return (
        <Router>
            <Navbar onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Home searchQuery={searchQuery} />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/edit/:id" element={<EditProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
