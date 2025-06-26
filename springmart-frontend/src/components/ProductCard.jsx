// src/components/ProductCard.jsx

import React from "react";
import styles from "../styles/components/ProductCard.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../services/api";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { toBoolean } from "../utils/booleanUtils";

function ProductCard({ product, imageVersion, onProductDelete }) {
    const {
        id,
        name,
        brand,
        price,
        inStock: rawInStock,
        imageName,
        category
    } = product;

    // Ensure inStock is always a boolean
    const inStock = toBoolean(rawInStock);
    
    console.log('ProductCard - Product:', name, 'Raw inStock:', rawInStock, 'Converted inStock:', inStock);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
    const imageUrl = `${API_BASE_URL}/api/products/image/${id}?v=${imageVersion}`;
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = '/no_image.jpg';
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(`Are you sure you want to delete the product "${name}"? This action cannot be undone.`);
        if (!confirmed) return;
        try {
            const status = await deleteData(`/products/${id}`);
            if (status === 204) {
                showSuccessToast("Product deleted successfully.");
                if (onProductDelete) onProductDelete();
            } else if (status === 404) {
                showErrorToast("Product not found. It may have already been deleted.");
            } else {
                showErrorToast("Unexpected response from server.");
            }
        } catch (err) {
            showErrorToast("Failed to delete product. Please try again.");
        }
    };

    return (
        <div className={styles.productCard}>
            <img
                src={imageUrl}
                alt={name}
                className={styles.productImage}
                onError={handleImageError}
            />
            <div className={styles.productDetails}>
                <h3>{name}</h3>
                <p className={styles.brand}>{brand}</p>
                <p className={styles.category}>Category: {category}</p>
                <p className={styles.price}>{price}</p>
                <p className={`${styles.stock} ${inStock ? styles.in : styles.out}`}>
                    {inStock ? "In Stock" : "Out of Stock"}
                </p>
                <div className={styles.productActions}>
                    <button className={styles.editButton} onClick={handleEdit}>🛠️ Edit</button>
                    <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
