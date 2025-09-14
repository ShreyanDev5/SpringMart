// src/App.jsx

import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import EditProduct from "./pages/EditProduct"; // Placeholder
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
import LoadingDelayModal from "./components/LoadingDelayModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Global styles are imported in index.js

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTarget, setSearchTarget] = useState("home"); // 'home' or 'products'
    const [imageVersion, setImageVersion] = useState(Date.now());
    const [productRefreshTrigger, setProductRefreshTrigger] = useState(0);
    const [showDelayModal, setShowDelayModal] = useState(false);

    // Check if we should show the delay modal (first visit or after 24 hours)
    useEffect(() => {
        const lastModalShown = localStorage.getItem('lastDelayModalShown');
        const now = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // Show modal if never shown before or if it's been more than 24 hours
        if (!lastModalShown || (now - parseInt(lastModalShown)) > oneDay) {
            setShowDelayModal(true);
        }
    }, []);

    const handleCloseDelayModal = () => {
        setShowDelayModal(false);
        // Store the current time in localStorage
        localStorage.setItem('lastDelayModalShown', new Date().getTime().toString());
    };

    // We need to use useNavigate, so wrap the Routes in a component with access to hooks
    const AppRoutes = () => {
        const navigate = useNavigate();
        const location = useLocation();

        const updateImageVersion = () => {
            setImageVersion(Date.now());
        };

        const refreshProducts = useCallback(() => {
            setProductRefreshTrigger(prev => prev + 1);
            updateImageVersion();
        }, []);

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
                    <Route path="/" element={<Home searchQuery={searchTarget === "home" ? searchQuery : ""} imageVersion={imageVersion} refreshTrigger={productRefreshTrigger} />} />
                    <Route path="/add" element={<AddProduct onProductUpdate={refreshProducts} />} />
                    <Route path="/edit/:id" element={<EditProduct onProductUpdate={refreshProducts} />} />
                    <Route path="/products" element={<ProductList searchQuery={searchTarget === "products" ? searchQuery : ""} imageVersion={imageVersion} refreshTrigger={productRefreshTrigger} />} />
                </Routes>
            </>
        );
    };

    return (
        <Router>
            <LoadingDelayModal isOpen={showDelayModal} onClose={handleCloseDelayModal} />
            <AppRoutes />
            <ToastContainer position="bottom-right" />
        </Router>
    );
}

export default App;
