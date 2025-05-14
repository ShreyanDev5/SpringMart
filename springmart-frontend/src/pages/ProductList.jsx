// src/pages/ProductList.jsx

import React, { useEffect, useState } from "react";
import { getData } from "../services/api";
import ProductCard from "../components/ProductCard";
import "../styles/ProductList.css";

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

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;
    if (products.length === 0) return <p>No products found.</p>;

    return (
        <div className="product-list-container">
            <h2>All Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
