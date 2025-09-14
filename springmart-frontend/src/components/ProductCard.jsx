// src/components/ProductCard.jsx

import React, { useEffect, useRef } from "react";
import styles from "../styles/components/ProductCard.module.scss";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
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
        category
        // imageName is not currently used
    } = product;

    // Ensure inStock is always a boolean
    const inStock = toBoolean(rawInStock);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
    const imageUrl = `${API_BASE_URL}/api/products/image/${id}?v=${imageVersion}`;
    const navigate = useNavigate();
    
    const imgRef = useRef(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const currentImgRef = imgRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && currentImgRef) {
                        currentImgRef.src = imageUrl;
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '50px' } // Start loading 50px before the image comes into view
        );

        if (currentImgRef) {
            observer.observe(currentImgRef);
        }

        return () => {
            if (currentImgRef) {
                observer.unobserve(currentImgRef);
            }
        };
    }, [imageUrl]);

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
                loading="lazy"
                ref={imgRef}
            />
            <div className={styles.productDetails}>
                <h3 title={name}>{name}</h3>
                <p className={styles.brand} title={brand}>{brand}</p>
                <p className={styles.category} title={category}>{category}</p>
                <p className={styles.price} title={`₹${price}`}>₹{price}</p>
                <p className={`${styles.stock} ${inStock ? styles.in : styles.out}`} title={inStock ? "In Stock" : "Out of Stock"}>
                    {inStock ? "In Stock" : "Out of Stock"}
                </p>
                <div className={styles.productActions}>
                    <button 
                        className={`${styles.actionButton} ${styles.editButton}`} 
                        onClick={handleEdit}
                        aria-label={`Edit ${name}`}
                    >
                        <FiEdit /> Edit
                    </button>
                    <button 
                        className={`${styles.actionButton} ${styles.deleteButton}`} 
                        onClick={handleDelete}
                        aria-label={`Delete ${name}`}
                    >
                        <FiTrash2 /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
