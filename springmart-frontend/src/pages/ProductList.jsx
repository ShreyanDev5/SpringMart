// src/pages/ProductList.jsx

import React, { useEffect, useState } from "react";
import { getData } from "../services/api";
import ProductCard from "../components/ProductCard";
import styles from "../styles/components/ProductList.module.scss";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getData("/products?page=0&size=20");
                setProducts(result.content || []); // If paginated
            } catch (err) {
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return (
        <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading products...</p>
        </div>
    );
    if (error) return <div className={styles.emptyState}><p>{error}</p></div>;
    if (products.length === 0) return <div className={styles.emptyState}><p>No products found.</p></div>;

    return (
        <div className={styles.productListContainer}>
            <div className={styles.productGrid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
