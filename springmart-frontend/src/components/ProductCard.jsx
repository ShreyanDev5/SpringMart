// src/components/ProductCard.jsx

import React from "react";
import styles from "../styles/components/ProductCard.module.scss";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const {
        id,
        name,
        brand,
        price,
        inStock,
        imageName,
        category
    } = product;

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
    const imageUrl = `${API_BASE_URL}/api/products/image/${id}`;
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className={styles.productCard}>
            <img
                src={imageName ? imageUrl : "/placeholder.png"}
                alt={name}
                className={styles.productImage}
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
                    <button className={styles.deleteButton}>🗑️ Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
