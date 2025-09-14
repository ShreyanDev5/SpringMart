// src/pages/AddProduct.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/components/AddProduct.module.scss";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { categories } from "../utils/categories";
import { showSuccessToast, showErrorToast } from '../utils/toast';

function AddProduct({ onProductUpdate }) {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        quantity: "",
        brand: "",
        inStock: true,
        releaseDate: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    // Cleanup image preview URL on component unmount
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!product.name.trim()) {
            newErrors.name = "Product name is required";
        }
        
        if (!product.price || product.price <= 0) {
            newErrors.price = "Price must be greater than 0";
        }
        
        if (!product.category) {
            newErrors.category = "Category is required";
        }
        
        if (!product.brand.trim()) {
            newErrors.brand = "Brand is required";
        }
        
        if (product.quantity && product.quantity < 0) {
            newErrors.quantity = "Quantity cannot be negative";
        }
        
        if (!image) {
            newErrors.image = "Product image is required";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "quantity"
                    ? value === "" ? "" : parseInt(value, 10)
                    : type === "checkbox"
                        ? checked
                        : value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                showErrorToast("Image size should be less than 5MB");
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                showErrorToast("Please upload a valid image file (JPG, PNG, etc.)");
                return;
            }
            
            // Clean up previous preview URL to prevent memory leaks
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            
            // Clear image error if exists
            if (errors.image) {
                setErrors(prev => ({
                    ...prev,
                    image: undefined
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showErrorToast("Please fix the errors in the form before submitting.");
            return;
        }
        
        setLoading(true);
        
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
        if (image) {
            formData.append("imageFile", image);
        }

        try {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
            const res = await axios.post(`${API_BASE_URL}/api/products`, formData, {
                // By removing the manual 'Content-Type' header, we allow the browser
                // to automatically set it with the correct 'boundary' for multipart data.
            });

            if (res.status === 201) {
                showSuccessToast("Product added successfully! Redirecting to home page...");
                onProductUpdate();
                
                // Clean up image preview URL
                if (imagePreview) {
                    URL.revokeObjectURL(imagePreview);
                }
                
                // Reset form
                setProduct({
                    name: "",
                    price: "",
                    description: "",
                    category: "",
                    quantity: "",
                    brand: "",
                    inStock: true,
                    releaseDate: "",
                });
                setImage(null);
                setImagePreview(null);
                setErrors({});
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (err) {
            let errorMsg = err.response?.data?.message || "Failed to add product. Please try again.";
            // Intercept backend integer parse error and show user-friendly message
            if (errorMsg && errorMsg.includes('Cannot deserialize value of type `java.lang.Integer`')) {
                const match = errorMsg.match(/from String "(.*?)"/);
                const received = match ? match[1] : 'a decimal value';
                errorMsg = `Invalid input: Expected an integer (whole number), but received "${received}". Please enter a value without decimals, e.g., "10".`;
            }
            showErrorToast(errorMsg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.addProductContainer} ${loading ? styles.loading : ''}`}>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className={styles.productForm} noValidate>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                        className={`${styles.styledInput} ${errors.name ? styles.invalid : ''}`}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <span id="name-error" className={styles.validationMessage}>{errors.name}</span>}
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="price">Price (₹)</label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                        min="0"
                        step="0.01"
                        className={`${styles.styledInput} ${errors.price ? styles.invalid : ''}`}
                        aria-describedby={errors.price ? "price-error" : undefined}
                    />
                    {errors.price && <span id="price-error" className={styles.validationMessage}>{errors.price}</span>}
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter product description (max 500 chars)"
                        maxLength="500"
                        className={styles.styledTextarea}
                        aria-describedby="description-info"
                    />
                    <span
                        id="description-info"
                        className={`${styles.charCount} ${product.description.length > 500 ? styles.charCountError : ''}`}>
                        {product.description.length}/500 characters
                    </span>
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className={`${styles.styledSelect} ${errors.category ? styles.invalid : ''}`}
                        aria-describedby={errors.category ? "category-error" : undefined}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && <span id="category-error" className={styles.validationMessage}>{errors.category}</span>}
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        min="0"
                        className={`${styles.styledInput} ${errors.quantity ? styles.invalid : ''}`}
                        aria-describedby={errors.quantity ? "quantity-error" : undefined}
                    />
                    {errors.quantity && <span id="quantity-error" className={styles.validationMessage}>{errors.quantity}</span>}
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="brand">Brand</label>
                    <input
                        id="brand"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        placeholder="Enter brand name"
                        required
                        className={`${styles.styledInput} ${errors.brand ? styles.invalid : ''}`}
                        aria-describedby={errors.brand ? "brand-error" : undefined}
                    />
                    {errors.brand && <span id="brand-error" className={styles.validationMessage}>{errors.brand}</span>}
                </div>
                
                <div className={styles.formGroup}>
                    <label>
                        <div className={styles.styledCheckbox}>
                            <input
                                id="inStock"
                                type="checkbox"
                                name="inStock"
                                checked={product.inStock}
                                onChange={handleChange}
                                aria-describedby="inStock-info"
                            />
                            <span>In Stock</span>
                        </div>
                    </label>
                    <span id="inStock-info" className={styles.helperText}>
                        Uncheck if product is currently unavailable
                    </span>
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="releaseDate">Release Date</label>
                    <input
                        id="releaseDate"
                        type="date"
                        name="releaseDate"
                        value={product.releaseDate}
                        onChange={handleChange}
                        className={styles.styledInput}
                        aria-describedby="releaseDate-info"
                    />
                    <span id="releaseDate-info" className={styles.helperText}>
                        Optional: When was this product released?
                    </span>
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="image">Product Image</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`${styles.styledFileUpload} ${errors.image ? styles.invalid : ''}`}
                        aria-describedby={errors.image ? "image-error" : "image-info"}
                    />
                    {errors.image && <span id="image-error" className={styles.validationMessage}>{errors.image}</span>}
                    {!errors.image && (
                        <span id="image-info" className={styles.helperText}>
                            JPG, PNG, or GIF (max 5MB)
                        </span>
                    )}
                    {imagePreview && (
                        <div style={{ marginTop: '1rem' }}>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '200px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb'
                                }}
                            />
                        </div>
                    )}
                </div>
                
                <button
                    type="submit"
                    className={styles.styledButton}
                    disabled={loading}
                    aria-busy={loading}
                >
                    {loading ? (
                        <>
                            <span>Adding Product...</span>
                        </>
                    ) : (
                        <>
                            <FiCheck style={{ marginRight: '0.5rem' }} />
                            Add Product
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
