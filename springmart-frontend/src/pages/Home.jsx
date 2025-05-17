// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Hero, Features, Products, Testimonials, CtaBanner, Newsletter } from "../components/home";
import "../styles/Home.scss";

function Home({ searchQuery }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all products initially
    useEffect(() => {
        fetchProducts();
    }, []);
    
    // Handle search from navbar
    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    }, [searchQuery]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/products");
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
    };

    const handleSearch = async (keyword) => {
        if (!keyword.trim()) {
            fetchProducts(); // fallback to all products
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:8080/api/products/search?keyword=${keyword}`
            );
            if (res.status === 200) {
                setProducts(res.data);
            } else if (res.status === 204) {
                setProducts([]);
            }
        } catch (err) {
            console.error("Search failed", err);
        }
    };

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

            {/* Testimonials Section */}
            <Testimonials />

            {/* CTA Banner */}
            <CtaBanner />

            {/* Newsletter Section */}
            <Newsletter />
        </div>
    );
}

export default Home;
