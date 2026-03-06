import React from "react";
import { FiCheck } from "react-icons/fi";
import styles from "../../../styles/components/AddProduct.module.scss";
import { PRODUCT_CATEGORIES } from "../form-utils";

function ProductForm({
    title,
    submitLabel,
    loadingLabel,
    product,
    imagePreview,
    errors,
    loading,
    previewLabel,
    onChange,
    onImageChange,
    onSubmit,
}) {
    return (
        <div className={`${styles.addProductContainer} ${loading ? styles.loading : ""}`}>
            <h2>{title}</h2>
            <form onSubmit={onSubmit} className={styles.productForm} noValidate>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={onChange}
                        placeholder="Enter product name"
                        required
                        className={`${styles.styledInput} ${errors.name ? styles.invalid : ""}`}
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
                        onChange={onChange}
                        placeholder="Enter price"
                        required
                        min="0"
                        step="0.01"
                        className={`${styles.styledInput} ${errors.price ? styles.invalid : ""}`}
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
                        onChange={onChange}
                        placeholder="Enter product description (max 500 chars)"
                        maxLength="500"
                        className={styles.styledTextarea}
                        aria-describedby="description-info"
                    />
                    <span
                        id="description-info"
                        className={`${styles.charCount} ${product.description.length > 500 ? styles.charCountError : ""}`}
                    >
                        {product.description.length}/500 characters
                    </span>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={onChange}
                        required
                        className={`${styles.styledSelect} ${errors.category ? styles.invalid : ""}`}
                        aria-describedby={errors.category ? "category-error" : undefined}
                    >
                        <option value="">Select Category</option>
                        {PRODUCT_CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                                {category}
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
                        onChange={onChange}
                        placeholder="Enter quantity"
                        min="0"
                        className={`${styles.styledInput} ${errors.quantity ? styles.invalid : ""}`}
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
                        onChange={onChange}
                        placeholder="Enter brand name"
                        required
                        className={`${styles.styledInput} ${errors.brand ? styles.invalid : ""}`}
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
                                onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onImageChange}
                        className={`${styles.styledFileUpload} ${errors.image ? styles.invalid : ""}`}
                        aria-describedby={errors.image ? "image-error" : "image-info"}
                    />
                    {errors.image && <span id="image-error" className={styles.validationMessage}>{errors.image}</span>}
                    {!errors.image && (
                        <span id="image-info" className={styles.helperText}>
                            JPG, PNG, or GIF (max 5MB)
                        </span>
                    )}
                    {imagePreview && (
                        <div style={{ marginTop: "1rem" }}>
                            {previewLabel && (
                                <div style={{ fontWeight: 500, marginBottom: 4 }}>
                                    {previewLabel}
                                </div>
                            )}
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "200px",
                                    objectFit: "contain",
                                    borderRadius: "8px",
                                    border: "1px solid #e5e7eb",
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
                        <span>{loadingLabel}</span>
                    ) : (
                        <>
                            <FiCheck style={{ marginRight: "0.5rem" }} />
                            {submitLabel}
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default ProductForm;