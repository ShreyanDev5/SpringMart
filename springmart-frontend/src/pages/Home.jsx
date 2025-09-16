// src/pages/Home.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { Hero, Features, CtaBanner } from "../components/home";
import Products from "../components/home/Products";
import "../styles/Home.scss";

function Home({ searchQuery, imageVersion, refreshTrigger = 0 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const productsSectionRef = useRef(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:8080`;

    const fetchProducts = useCallback(async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/products?page=0&size=3`);
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

    // Refetch products when refreshTrigger changes (when products are updated)
    useEffect(() => {
        if (refreshTrigger > 0) {
            fetchProducts();
        }
    }, [refreshTrigger, fetchProducts]);

    // Handle search from navbar
    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
            // Smooth scroll to products section after search
            setTimeout(() => {
                if (productsSectionRef.current) {
                    productsSectionRef.current.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); // slight delay to ensure products are rendered
        }
    }, [searchQuery, handleSearch]);

    return (
        <div className="home-container">
            {/* Hero Section - no longer needs search functionality */}
            <Hero />

            {/* Products Section */}
            <section ref={productsSectionRef} className="section">
                <Products 
                    products={products} 
                    loading={loading} 
                    error={error} 
                    imageVersion={imageVersion}
                    onProductDelete={fetchProducts}
                    onRetry={fetchProducts}
                />
            </section>

            {/* Features Section */}
            <Features />

            {/* CTA Banner */}
            <CtaBanner />
        </div>
    );
}

export default Home;
