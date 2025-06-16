// src/pages/ProductList.jsx

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import styles from "../styles/components/ProductList.module.scss";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:8080`;

    const fetchProducts = useCallback(async () => {
        console.log('Fetching products from:', `${API_BASE_URL}/api/products`);
        setLoading(true);
        setError(null);
        
        try {
            const res = await axios.get(`${API_BASE_URL}/api/products`);
            console.log('API Response:', res);
            
            if (res.status === 200) {
                console.log('Products data:', res.data);
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
                
                if (productsData.length === 0) {
                    console.log('No products found in the response');
                    setProducts([]);
                } else {
                    console.log(`Found ${productsData.length} products`);
                    setProducts(productsData);
                }
            } else if (res.status === 204) {
                console.log('No products found (204 response)');
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
        console.log('ProductList component mounted');
        fetchProducts();
    }, [fetchProducts]);

    // Debug render
    console.log('Current state:', { 
        productsCount: products.length, 
        loading, 
        error,
        firstProduct: products[0] // Log first product for debugging
    });

    if (loading) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Loading products...</p>
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
                {products.map(product => {
                    console.log('Rendering product:', product);
                    return (
                        <ProductCard 
                            key={product.id} 
                            product={product}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ProductList;
