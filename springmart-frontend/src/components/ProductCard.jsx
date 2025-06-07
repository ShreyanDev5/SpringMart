// src/components/ProductCard.jsx

import React from "react";
import styles from "../styles/components/ProductCard.module.scss";

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

    const imageUrl = `http://localhost:8080/api/products/image/${id}`;

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
                    <button className={styles.editButton}>🛠️ Edit</button>
                    <button className={styles.deleteButton}>🗑️ Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
