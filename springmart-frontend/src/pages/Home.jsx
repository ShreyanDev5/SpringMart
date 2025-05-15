// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTag, FiTruck, FiShield, FiArrowRight, FiStar } from "react-icons/fi";
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
                    <div className="hero-badge">Premium Shopping Experience</div>
                    <h1>Welcome to <span className="highlight">SpringMart</span></h1>
                    <p className="hero-subtitle">Discover amazing products at unbeatable prices with our curated collection</p>
                    <div className="search-container">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="cta-buttons">
                        <Link to="/products" className="btn btn-primary">Shop Now <FiArrowRight className="btn-icon" /></Link>
                        <Link to="/add-product" className="btn btn-outline">Sell with Us</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-card">
                        <div className="hero-card-badge">Featured</div>
                        <div className="hero-card-content">
                            <h3>Premium Collection</h3>
                            <p>Exclusive products for you</p>
                            <Link to="/products" className="hero-card-link">Explore <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="section-header centered">
                    <h2>Why Choose SpringMart</h2>
                    <p>Experience shopping like never before</p>
                </div>
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
                <div className="section-header with-action">
                    <div>
                        <h2>Featured Products</h2>
                        <p>Handpicked items just for you</p>
                    </div>
                    <Link to="/products" className="view-all-link">View All <FiArrowRight /></Link>
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

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="section-header centered">
                    <h2>What Our Customers Say</h2>
                    <p>Trusted by thousands of shoppers</p>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="testimonial-rating">
                            <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                        </div>
                        <p className="testimonial-text">"SpringMart offers an amazing shopping experience with quality products and fast delivery. Highly recommended!"</p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">AM</div>
                            <div className="testimonial-info">
                                <h4>Alex Mitchell</h4>
                                <p>Loyal Customer</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-rating">
                            <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                        </div>
                        <p className="testimonial-text">"The product selection is outstanding and the user interface makes shopping a breeze. I'm a happy customer!"</p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">SP</div>
                            <div className="testimonial-info">
                                <h4>Sarah Parker</h4>
                                <p>Verified Buyer</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-rating">
                            <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                        </div>
                        <p className="testimonial-text">"I love the new design! The website is beautiful and makes shopping so much more enjoyable. Will definitely be back!"</p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">JD</div>
                            <div className="testimonial-info">
                                <h4>Jamie Davis</h4>
                                <p>New Customer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <div className="cta-content">
                    <h2>Ready to find something amazing?</h2>
                    <p>Join thousands of happy customers shopping with us today</p>
                    <div className="cta-buttons">
                        <Link to="/register" className="btn btn-light">Sign Up Now <FiArrowRight className="btn-icon" /></Link>
                        <Link to="/products" className="btn btn-outline-light">Browse Products</Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <div className="newsletter-content">
                    <h2>Stay Updated</h2>
                    <p>Subscribe to our newsletter for the latest products and exclusive offers</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Your email address" required />
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Home;
