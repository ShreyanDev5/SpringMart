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
    const [imageVersion, setImageVersion] = useState(Date.now());

    // We need to use useNavigate, so wrap the Routes in a component with access to hooks
    const AppRoutes = () => {
        const navigate = useNavigate();
        const location = useLocation();

        const updateImageVersion = () => {
            setImageVersion(Date.now());
        };

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
                    <Route path="/" element={<Home searchQuery={searchTarget === "home" ? searchQuery : ""} imageVersion={imageVersion} />} />
                    <Route path="/add" element={<AddProduct onProductUpdate={updateImageVersion} />} />
                    <Route path="/edit/:id" element={<EditProduct onProductUpdate={updateImageVersion} />} />
                    <Route path="/products" element={<ProductList searchQuery={searchTarget === "products" ? searchQuery : ""} imageVersion={imageVersion} />} />
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
