// src/components/ProductCard.jsx

import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/components/ProductCard.module.scss";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiTag, FiShoppingBag } from "react-icons/fi";
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
    const cardRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Check if device supports touch
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const currentImgRef = imgRef.current;
        if (!currentImgRef) return;

        // If image is already loaded, don't observe
        if (currentImgRef.src && currentImgRef.complete) {
            return;
        }

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

        observer.observe(currentImgRef);

        return () => {
            observer.disconnect();
        };
    }, [imageUrl]);

    // Handle touch events for mobile hover effect
    const handleTouchStart = () => {
        if (isTouchDevice && cardRef.current) {
            // Add touch hover class
            cardRef.current.classList.add(styles.touchHover);
            
            // Remove the class after a delay to simulate hover effect
            setTimeout(() => {
                if (cardRef.current) {
                    cardRef.current.classList.remove(styles.touchHover);
                }
            }, 3000); // Remove after 3 seconds
        }
    };

    // Handle mouse events for desktop
    const handleMouseEnter = () => {
        if (!isTouchDevice && cardRef.current) {
            // Ensure touch hover class is removed for desktop
            cardRef.current.classList.remove(styles.touchHover);
        }
    };

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
        <div 
            className={styles.productCard}
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onMouseEnter={handleMouseEnter}
        >
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
                <div className={styles.metaInfo}>
                    <span className={styles.brand} title={brand}>
                        <FiTag className={styles.metaIcon} />
                        {brand}
                    </span>
                    <span className={styles.category} title={category}>
                        <FiShoppingBag className={styles.metaIcon} />
                        {category}
                    </span>
                </div>
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
