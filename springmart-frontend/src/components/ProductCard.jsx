// src/components/ProductCard.jsx

import React from "react";
import "../styles/ProductCard.css";

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
        <div className="product-card">
            <img
                src={imageName ? imageUrl : "/placeholder.png"}
                alt={name}
                className="product-image"
            />
            <div className="product-details">
                <h3>{name}</h3>
                <p className="brand">{brand}</p>
                <p className="category">Category: {category}</p>
                <p className="price">₹{price}</p>
                <p className={`stock ${inStock ? "in" : "out"}`}>
                    {inStock ? "In Stock" : "Out of Stock"}
                </p>
                <div className="product-actions">
                    <button className="edit-button">🛠️ Edit</button>
                    <button className="delete-button">🗑️ Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
