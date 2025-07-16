// src/pages/ProductList.jsx

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import styles from "../styles/components/ProductList.module.scss";

function ProductList({ searchQuery = "", imageVersion, refreshTrigger = 0 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:8080`;

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const res = await axios.get(`${API_BASE_URL}/api/products`);
            
            if (res.status === 200) {
                // Handle different possible response structures
                let productsData = [];
                
                if (Array.isArray(res.data)) {
                    productsData = res.data;
                } else if (res.data.content && Array.isArray(res.data.content)) {
                    productsData = res.data.content;
                } else if (res.data.products && Array.isArray(res.data.products)) {
                    productsData = res.data.products;
                } else {
                    console.error('Unexpected data structure:', res.data);
                    throw new Error("Invalid data format received from server");
                }
                
                setProducts(productsData);
            } else if (res.status === 204) {
                setProducts([]);
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            const errorMessage = err.response?.data?.message || 
                               err.message || 
                               "Failed to load products. Please try again later.";
            setError(errorMessage);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        if (searchQuery && searchQuery.trim()) {
            // Perform search
            const searchProducts = async () => {
                setLoading(true);
                setError(null);
                try {
                    const res = await axios.get(
                        `${API_BASE_URL}/api/products/search?keyword=${encodeURIComponent(searchQuery)}`
                    );
                    if (res.status === 200) {
                        setProducts(res.data);
                    } else if (res.status === 204) {
                        setProducts([]);
                    }
                } catch (err) {
                    const errorMessage = err.response?.data?.message || 
                                       err.message || 
                                       "Failed to search products. Please try again later.";
                    setError(errorMessage);
                    setProducts([]);
                } finally {
                    setLoading(false);
                }
            };
            searchProducts();
        } else {
            // If no search query, fetch all products
            fetchProducts();
        }
    }, [searchQuery, fetchProducts, API_BASE_URL]);

    // Refetch products when refreshTrigger changes (when products are updated)
    useEffect(() => {
        if (refreshTrigger > 0 && !searchQuery) {
            fetchProducts();
        }
    }, [refreshTrigger, fetchProducts, searchQuery, API_BASE_URL]);

    if (loading) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Loading products...</p>
                <p style={{ marginTop: '1rem', color: '#b36b00', fontSize: '0.98rem' }}>
                  This app is hosted on Render's free tier, which may cause slow loading times due to server cold starts.<br/>
                  If products do not load within 2 minutes, please check back again later.
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.emptyState}>
                <p>Error: {error}</p>
                <button 
                    onClick={() => fetchProducts()} 
                    className={styles.retryButton}
                >
                    Retry
                </button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>No products found.</p>
                <p className={styles.emptyStateSubtext}>
                    Check back later for new products or try adding some yourself!
                </p>
            </div>
        );
    }

    return (
        <div className={styles.productListContainer}>
            <h1 className={styles.pageTitle}>All Products</h1>
            <div className={styles.productGrid}>
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                        imageVersion={imageVersion}
                        onProductDelete={fetchProducts}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
