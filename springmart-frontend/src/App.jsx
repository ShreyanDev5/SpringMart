// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import EditProduct from "./pages/EditProduct"; // Placeholder
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
// Global styles are imported in index.js

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTarget, setSearchTarget] = useState("home"); // 'home' or 'products'

    // We need to use useNavigate, so wrap the Routes in a component with access to hooks
    const AppRoutes = () => {
        const navigate = useNavigate();
        const location = useLocation();

        const handleSearch = (query, target = null) => {
            // Determine current page
            const currentPath = location.pathname;
            let page = target;
            if (!page) {
                if (currentPath === "/products") {
                    page = "products";
                } else {
                    page = "home";
                }
            }
            setSearchQuery(query);
            setSearchTarget(page);
            // Only navigate if not already on the correct page
            if (page === "products" && currentPath !== "/products") {
                navigate("/products");
            } else if (page === "home" && currentPath !== "/") {
                navigate("/");
            }
        };

        return (
            <>
                <Navbar onSearch={handleSearch} />
                <Routes>
                    <Route path="/" element={<Home searchQuery={searchTarget === "home" ? searchQuery : ""} />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/edit/:id" element={<EditProduct />} />
                    <Route path="/products" element={<ProductList searchQuery={searchTarget === "products" ? searchQuery : ""} />} />
                </Routes>
            </>
        );
    };

    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
