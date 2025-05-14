// src/pages/AddProduct.jsx

import React, { useState } from "react";
import axios from "axios";
import "../styles/AddProduct.css";
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
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await axios.post("http://localhost:8080/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 201) {
                toast.success("✅ Product added successfully!");
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
            }
        } catch (err) {
            toast.error("❌ Failed to add product.");
            console.error(err);
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <input name="name" value={product.name} onChange={handleChange} placeholder="Name" required className="styled-input" />
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required className="styled-input" />
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description (max 500 chars)" maxLength="500" className="styled-textarea" />
                <select name="category" value={product.category} onChange={handleChange} required className="styled-select">
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="books">Books</option>
                </select>
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" className="styled-input" />
                <input name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" required className="styled-input" />
                <label className="styled-checkbox">
                    <input type="checkbox" name="inStock" checked={product.inStock} onChange={handleChange} />
                    In Stock
                </label>
                <input type="date" name="releaseDate" value={product.releaseDate} onChange={handleChange} className="styled-input" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="styled-file-upload" />
                <button type="submit" className="styled-button">Add Product</button>
            </form>
            {message && <p className="status-message">{message}</p>}
            <ToastContainer />
        </div>
    );
}

export default AddProduct;
