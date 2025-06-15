// src/pages/Home.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Hero, Features, Products, CtaBanner } from "../components/home";
import "../styles/Home.scss";

function Home({ searchQuery }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:8080`;

    const fetchProducts = useCallback(async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/products`);
            if (res.status === 200) {
                setProducts(res.data.content || []);
            } else if (res.status === 204) {
                setProducts([]);
            }
        } catch (err) {
            setError("Failed to load products.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]);

    const handleSearch = useCallback(async (keyword) => {
        if (!keyword.trim()) {
            fetchProducts(); // fallback to all products
            return;
        }

        try {
            const res = await axios.get(
                `${API_BASE_URL}/api/products/search?keyword=${encodeURIComponent(keyword)}`
            );
            if (res.status === 200) {
                setProducts(res.data);
            } else if (res.status === 204) {
                setProducts([]);
            }
        } catch (err) {
            console.error("Search failed", err);
        }
    }, [API_BASE_URL, fetchProducts]);

    // Fetch all products initially
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Handle search from navbar
    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    }, [searchQuery, handleSearch]);

    return (
        <div className="home-container">
            {/* Hero Section - no longer needs search functionality */}
            <Hero />

            {/* Features Section */}
            <Features />

            {/* Products Section */}
            <Products 
                products={products.slice(0, 4)} 
                loading={loading} 
                error={error} 
            />

            {/* CTA Banner */}
            <CtaBanner />
        </div>
    );
}

export default Home;
