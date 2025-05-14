import React from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
    const { id } = useParams();

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Edit Product</h1>
            <p>Editing product with ID: {id}</p>
        </div>
    );
}

export default EditProduct;
