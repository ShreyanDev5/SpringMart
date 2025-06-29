import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/components/AddProduct.module.scss";
import { showSuccessToast, showErrorToast } from '../utils/toast';
import { categories } from "../utils/categories";
import { toBoolean } from "../utils/booleanUtils";

function EditProduct({ onProductUpdate }) {
    const { id } = useParams();
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
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            try {
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
                const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const data = await res.json();
                let releaseDate = "";
                if (data.releaseDate) {
                    const dateObj = new Date(data.releaseDate);
                    if (!isNaN(dateObj)) {
                        const yyyy = dateObj.getFullYear();
                        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
                        const dd = String(dateObj.getDate()).padStart(2, '0');
                        releaseDate = `${yyyy}-${mm}-${dd}`;
                    }
                }
                setProduct({
                    name: data.name || "",
                    price: data.price || "",
                    description: data.description || "",
                    category: data.category || "",
                    quantity: data.quantity || "",
                    brand: data.brand || "",
                    inStock: toBoolean(data.inStock),
                    releaseDate: releaseDate,
                });
                console.log('Loaded product data - inStock:', data.inStock, 'converted to:', toBoolean(data.inStock));
                if (data.imageName) {
                    setImagePreview(`${API_BASE_URL}/api/products/image/${id}`);
                }
            } catch (err) {
                console.log('Failed to load product data error', err);
                showErrorToast("Failed to load product data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!product.name.trim()) newErrors.name = "Product name is required";
        if (!product.price || product.price <= 0) newErrors.price = "Price must be greater than 0";
        if (!product.category) newErrors.category = "Category is required";
        if (!product.brand.trim()) newErrors.brand = "Brand is required";
        if (product.quantity && product.quantity < 0) newErrors.quantity = "Quantity cannot be negative";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'inStock') {
            console.log('Checkbox changed - name:', name, 'checked:', checked, 'type:', type);
        }
        setProduct((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "quantity"
                    ? value === "" ? "" : parseInt(value, 10)
                    : type === "checkbox"
                        ? checked
                        : value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                console.log('Image size error');
                showErrorToast("Image size should be less than 5MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                console.log('Image type error');
                showErrorToast("Please upload a valid image file (JPG, PNG, etc.)");
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log('Form validation error');
            showErrorToast("Please fix the errors in the form before submitting.");
            return;
        }
        setLoading(true);
        console.log('Submitting product with inStock:', product.inStock, 'type:', typeof product.inStock);
        console.log('Complete product object:', product);
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
        if (image) {
            formData.append("imageFile", image);
        }
        try {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
            const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
                method: "PUT",
                body: formData
            });
            if (!res.ok) throw new Error("Failed to update product");
            showSuccessToast("Product updated successfully! Redirecting to home page...");
            onProductUpdate();
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            console.log('API/network error', err);
            showErrorToast("Failed to update product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.addProductContainer} ${loading ? styles.loading : ''}`}>
            <h2>Edit Product</h2>
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
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
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
                        className={styles.styledFileUpload}
                    />
                    {imagePreview && (
                        <div style={{ marginTop: '1rem' }}>
                            <div style={{ fontWeight: 500, marginBottom: 4 }}>
                                {image ? "New Image Preview" : "Current Image"}
                            </div>
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
                    {loading ? 'Updating Product...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
}

export default EditProduct;
