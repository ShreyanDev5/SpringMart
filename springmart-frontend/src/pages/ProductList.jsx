// src/pages/ProductList.jsx

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { EmptyState, ErrorState } from "../components/UIStates";
import LoadingMessage from "../components/LoadingMessage";
import styles from "../styles/components/ProductList.module.scss";

function ProductList({ searchQuery = "", imageVersion, refreshTrigger = 0 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:8080`;

    const fetchProducts = useCallback(async (currentPage) => {
        setLoading(true);
        setError(null);
        
        try {
            const res = await axios.get(`${API_BASE_URL}/api/products?page=${currentPage}&size=12`);
            
            if (res.status === 200) {
                let newProducts = [];
                
                if (Array.isArray(res.data)) {
                    newProducts = res.data;
                    // For array responses, we assume there are no more if we get less than 12 items
                    setHasMore(newProducts.length === 12);
                } else if (res.data.content && Array.isArray(res.data.content)) {
                    newProducts = res.data.content;
                    // const totalElements = res.data.totalElements || 0;
                    const totalPages = res.data.totalPages || 0;
                    // For paginated responses, check if we've reached the last page
                    setHasMore(currentPage < totalPages - 1);
                }

                setProducts(prev => currentPage === 0 ? newProducts : [...prev, ...newProducts]);

            } else if (res.status === 204) {
                setProducts([]);
                setHasMore(false);
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
                        setHasMore(false); // Assuming search does not paginate for now
                    } else if (res.status === 204) {
                        setProducts([]);
                        setHasMore(false);
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
            setProducts([]);
            setPage(0);
            fetchProducts(0);
        }
    }, [searchQuery, API_BASE_URL, fetchProducts]);

    useEffect(() => {
        if (!searchQuery) {
            fetchProducts(page);
        }
    }, [page, searchQuery, fetchProducts]);


    // Refetch products when refreshTrigger changes (when products are updated)
    useEffect(() => {
        if (refreshTrigger > 0 && !searchQuery) {
            setProducts([]);
            setPage(0);
            fetchProducts(0);
        }
    }, [refreshTrigger, searchQuery, fetchProducts]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    const handleProductDelete = useCallback(() => {
        setProducts([]);
        setPage(0);
        fetchProducts(0);
    }, [fetchProducts]);

    // Show enhanced loading state for better UX
    if (loading && page === 0) {
        return (
            <div className={styles.productListContainer}>
                <h1 className={styles.pageTitle}>
                    {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
                </h1>
                <LoadingMessage 
                    message={searchQuery ? `Searching for "${searchQuery}"...` : "Loading products..."} 
                    onRetry={() => fetchProducts(0)}
                />
                <div className={styles.productGrid}>
                    {[...Array(12)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.productListContainer}>
                <h1 className={styles.pageTitle}>
                    {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
                </h1>
                <ErrorState 
                    title="Failed to Load Products"
                    description={error}
                    onRetry={() => fetchProducts(0)}
                />
            </div>
        );
    }

    if (products.length === 0 && !loading) {
        return (
            <div className={styles.productListContainer}>
                <h1 className={styles.pageTitle}>
                    {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
                </h1>
                <EmptyState 
                    title={searchQuery ? "No Products Found" : "No Products Available"}
                    description={
                        searchQuery 
                            ? "Try adjusting your search query or browse all products." 
                            : "Check back later for new products or try adding some yourself!"
                    }
                />
            </div>
        );
    }

    return (
        <div className={styles.productListContainer}>
            <h1 className={styles.pageTitle}>
                {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
            </h1>
            {loading && page > 0 && (
                <LoadingMessage 
                    message="Loading more products..." 
                    onRetry={() => fetchProducts(page)}
                />
            )}
            <div className={styles.productGrid}>
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                        imageVersion={imageVersion}
                        onProductDelete={handleProductDelete}
                    />
                ))}
            </div>
            {hasMore && !loading && (
                <div className={styles.loadMoreContainer}>
                    <button onClick={loadMore} className={styles.loadMoreButton}>
                        Load More
                    </button>
                </div>
            )}
            {loading && page > 0 && (
                <div className={styles.productGrid}>
                    {[...Array(6)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
