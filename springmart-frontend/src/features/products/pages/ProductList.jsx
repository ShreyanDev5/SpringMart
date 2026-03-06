import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoadingMessage from "../../../shared/components/LoadingMessage";
import { EmptyState, ErrorState } from "../../../shared/components/UIStates";
import styles from "../../../styles/components/ProductList.module.scss";
import { getProductsPage, searchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

const PAGE_SIZE = 12;

function ProductList({ searchQuery = "", imageVersion, refreshTrigger = 0 }) {
    const normalizedSearchQuery = useMemo(() => searchQuery.trim(), [searchQuery]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadProducts = useCallback(async (pageToLoad, replace = true) => {
        setLoading(true);
        setError(null);

        try {
            if (normalizedSearchQuery) {
                const matches = await searchProducts(normalizedSearchQuery);
                setProducts(matches);
                setHasMore(false);
                return;
            }

            const response = await getProductsPage(pageToLoad, PAGE_SIZE);
            setProducts((currentProducts) => (replace ? response.items : [...currentProducts, ...response.items]));
            setHasMore(response.hasMore);
        } catch (requestError) {
            const errorMessage = requestError?.message || "Failed to load products. Please try again later.";
            setError(errorMessage);
            if (replace) {
                setProducts([]);
            }
        } finally {
            setLoading(false);
        }
    }, [normalizedSearchQuery]);

    useEffect(() => {
        setPage(0);
        loadProducts(0, true);
    }, [loadProducts, refreshTrigger]);

    useEffect(() => {
        if (page > 0 && !normalizedSearchQuery) {
            loadProducts(page, false);
        }
    }, [loadProducts, normalizedSearchQuery, page]);

    const handleReload = useCallback(() => {
        setPage(0);
        loadProducts(0, true);
    }, [loadProducts]);

    if (loading && page === 0) {
        return (
            <div className={styles.productListContainer}>
                <h1 className={styles.pageTitle}>
                    {normalizedSearchQuery ? `Search Results for "${normalizedSearchQuery}"` : "All Products"}
                </h1>
                <div className={styles.loadingContainer}>
                    <LoadingMessage
                        message={normalizedSearchQuery ? `Searching for "${normalizedSearchQuery}"...` : "Waking Up the Store"}
                        onRetry={handleReload}
                    />
                </div>
                <div className={styles.productGrid}>
                    {Array.from({ length: PAGE_SIZE }).map((_, index) => (
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
                    {normalizedSearchQuery ? `Search Results for "${normalizedSearchQuery}"` : "All Products"}
                </h1>
                <ErrorState
                    title="Failed to Load Products"
                    description={error}
                    onRetry={handleReload}
                />
            </div>
        );
    }

    if (products.length === 0 && !loading) {
        return (
            <div className={styles.productListContainer}>
                <h1 className={styles.pageTitle}>
                    {normalizedSearchQuery ? `Search Results for "${normalizedSearchQuery}"` : "All Products"}
                </h1>
                <EmptyState
                    title={normalizedSearchQuery ? "No Products Found" : "No Products Available"}
                    description={
                        normalizedSearchQuery
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
                {normalizedSearchQuery ? `Search Results for "${normalizedSearchQuery}"` : "All Products"}
            </h1>
            {loading && page > 0 && (
                <div className={styles.loadingContainer}>
                    <LoadingMessage message="Waking Up the Store" onRetry={() => loadProducts(page, false)} />
                </div>
            )}
            <div className={styles.productGrid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        imageVersion={imageVersion}
                        onProductDelete={handleReload}
                    />
                ))}
            </div>
            {hasMore && !loading && (
                <div className={styles.loadMoreContainer}>
                    <button onClick={() => setPage((currentPage) => currentPage + 1)} className={styles.loadMoreButton}>
                        Load More
                    </button>
                </div>
            )}
            {loading && page > 0 && (
                <div className={styles.productGrid}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;