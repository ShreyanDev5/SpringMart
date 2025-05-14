// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all products initially
    useEffect(() => {
        fetchProducts();
    }, []);

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
            <h1>SpringMart 🛍️</h1>
            <div className="hero-banner">
                <h2>Welcome to SpringMart!</h2>
                <p>Your one-stop shop for all your needs.</p>
                <Link to="/add-product" className="add-product-link">Add a New Product</Link>
            </div>
            <SearchBar onSearch={handleSearch} />

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ProductList />
            )}
        </div>
    );
}

export default Home;
