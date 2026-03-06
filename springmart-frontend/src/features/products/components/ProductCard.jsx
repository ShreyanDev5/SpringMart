import React, { useEffect, useRef, useState } from "react";
import { FiEdit, FiShoppingBag, FiTag, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/components/ProductCard.module.scss";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "../../../shared/toast";
import { deleteProduct, getProductImageUrl } from "../api";
import { toBoolean } from "../form-utils";

function ProductCard({ product, imageVersion, onProductDelete }) {
    const { id, name, brand, price, inStock: rawInStock, category } = product;
    const inStock = toBoolean(rawInStock);
    const navigate = useNavigate();

    const imgRef = useRef(null);
    const cardRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const imageUrl = getProductImageUrl(id, imageVersion);

    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    useEffect(() => {
        const currentImgRef = imgRef.current;

        if (!currentImgRef || (currentImgRef.src && currentImgRef.complete)) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && currentImgRef) {
                        currentImgRef.src = imageUrl;
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "50px" }
        );

        observer.observe(currentImgRef);

        return () => observer.disconnect();
    }, [imageUrl]);

    function handleTouchStart() {
        if (!isTouchDevice || !cardRef.current) {
            return;
        }

        cardRef.current.classList.add(styles.touchHover);

        setTimeout(() => {
            if (cardRef.current) {
                cardRef.current.classList.remove(styles.touchHover);
            }
        }, 3000);
    }

    function handleImageError(event) {
        event.target.onerror = null;
        event.target.src = "/no_image.jpg";
    }

    async function handleConfirmDelete() {
        setIsDeleting(true);

        try {
            const status = await deleteProduct(id);

            if (status === 204) {
                showSuccessToast("Product deleted");
                onProductDelete?.();
            } else if (status === 404) {
                showErrorToast("Product not found. It may have already been deleted.");
            } else {
                showErrorToast("Unexpected response from server.");
            }
        } catch {
            showErrorToast("Failed to delete product. Please try again.");
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    }

    return (
        <>
            <div className={styles.productCard} ref={cardRef} onTouchStart={handleTouchStart}>
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
                            onClick={() => navigate(`/edit/${id}`)}
                            aria-label={`Edit ${name}`}
                        >
                            <FiEdit /> Edit
                        </button>
                        <button
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            onClick={() => setShowDeleteModal(true)}
                            aria-label={`Delete ${name}`}
                        >
                            <FiTrash2 /> Delete
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Product?"
                message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                loading={isDeleting}
            />
        </>
    );
}

export default ProductCard;