// src/pages/AddProduct.jsx

import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/components/AddProduct.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
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
            [name]: type === "checkbox" ? checked : value,
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
                toast.error("Image size should be less than 5MB");
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file");
                return;
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
            toast.error("Please fix the errors in the form");
            return;
        }
        
        setLoading(true);
        
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
        if (image) {
            formData.append("image", image);
        }

        try {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
            const res = await axios.post(`${API_BASE_URL}/api/products`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 201) {
                toast.success("✅ Product added successfully!");
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
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "❌ Failed to add product");
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
                    />
                    {errors.name && <span className={styles.validationMessage}>{errors.name}</span>}
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="price">Price</label>
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
                    />
                    {errors.price && <span className={styles.validationMessage}>{errors.price}</span>}
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
                    />
                    <span className={styles.validationMessage}>
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
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="books">Books</option>
                    </select>
                    {errors.category && <span className={styles.validationMessage}>{errors.category}</span>}
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
                    />
                    {errors.quantity && <span className={styles.validationMessage}>{errors.quantity}</span>}
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
                    />
                    {errors.brand && <span className={styles.validationMessage}>{errors.brand}</span>}
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="inStock">In Stock</label>
                    <div className={styles.styledCheckbox}>
                        <input
                            id="inStock"
                            type="checkbox"
                            name="inStock"
                            checked={product.inStock}
                            onChange={handleChange}
                        />
                    </div>
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
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="image">Product Image</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`${styles.styledFileUpload} ${errors.image ? styles.invalid : ''}`}
                    />
                    {errors.image && <span className={styles.validationMessage}>{errors.image}</span>}
                    {imagePreview && (
                        <div style={{ marginTop: '1rem' }}>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    maxWidth: '200px',
                                    maxHeight: '200px',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                    )}
                </div>
                
                <button
                    type="submit"
                    className={styles.styledButton}
                    disabled={loading}
                >
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>
            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default AddProduct;
