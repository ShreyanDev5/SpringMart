// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTag, FiTruck, FiShield } from "react-icons/fi";
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

    const features = [
        { icon: <FiShoppingBag />, title: "Wide Selection", description: "Discover thousands of quality products" },
        { icon: <FiTruck />, title: "Fast Delivery", description: "Quick and reliable shipping" },
        { icon: <FiTag />, title: "Best Prices", description: "Competitive pricing every day" },
        { icon: <FiShield />, title: "Secure Payments", description: "100% secure checkout" }
    ];

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to <span className="highlight">SpringMart</span></h1>
                    <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
                    <div className="search-container">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="cta-buttons">
                        <Link to="/products" className="btn btn-primary">Shop Now</Link>
                        <Link to="/add-product" className="btn btn-outline">Sell with Us</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section">
                <div className="section-header">
                    <h2>Featured Products</h2>
                    <p>Handpicked items just for you</p>
                </div>
                
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading amazing products...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p className="error">{error}</p>
                        <button onClick={fetchProducts} className="btn btn-outline">Try Again</button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="empty-state">
                        <p>No products found. Be the first to add one!</p>
                        <Link to="/add-product" className="btn btn-primary">Add Product</Link>
                    </div>
                ) : (
                    <ProductList products={products} />
                )}
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <div className="cta-content">
                    <h2>Ready to find something amazing?</h2>
                    <p>Join thousands of happy customers shopping with us today</p>
                    <Link to="/register" className="btn btn-light">Sign Up Now</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
