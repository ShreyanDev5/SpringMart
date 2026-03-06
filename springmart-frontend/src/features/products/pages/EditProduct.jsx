import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../shared/toast";
import { getApiBaseUrl, getProductById, updateProduct } from "../api";
import ProductForm from "../components/ProductForm";
import {
    buildProductFormData,
    createEmptyProduct,
    getFriendlyProductErrorMessage,
    normalizeProductForForm,
    toProductFieldValue,
    validateProduct,
} from "../form-utils";

function EditProduct({ onProductUpdate }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(createEmptyProduct);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => () => {
        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }
    }, [imagePreview]);

    useEffect(() => {
        let isMounted = true;

        async function loadProduct() {
            setLoading(true);

            try {
                const data = await getProductById(id);

                if (!isMounted) {
                    return;
                }

                setProduct(normalizeProductForForm(data));

                if (data.imageName) {
                    setImagePreview(`${getApiBaseUrl()}/api/products/image/${id}`);
                }
            } catch {
                if (isMounted) {
                    showErrorToast("Failed to load product data. Please try again later.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadProduct();

        return () => {
            isMounted = false;
        };
    }, [id]);

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        setProduct((currentProduct) => ({
            ...currentProduct,
            [name]: toProductFieldValue(name, value, type, checked),
        }));

        if (errors[name]) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                [name]: undefined,
            }));
        }
    }

    function handleImageChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            showErrorToast("Image size should be less than 5MB");
            return;
        }

        if (!file.type.startsWith("image/")) {
            showErrorToast("Please upload a valid image file (JPG, PNG, etc.)");
            return;
        }

        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const nextErrors = validateProduct(product);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            showErrorToast("Please fix the errors in the form before submitting.");
            return;
        }

        setLoading(true);

        try {
            await updateProduct(id, buildProductFormData(product, image));
            showSuccessToast("Product updated");
            onProductUpdate?.();
            setTimeout(() => navigate("/products"), 1500);
        } catch (error) {
            showErrorToast(getFriendlyProductErrorMessage(error, "Failed to update product. Please try again."));
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProductForm
            title="Edit Product"
            submitLabel="Update Product"
            loadingLabel="Updating Product..."
            product={product}
            imagePreview={imagePreview}
            previewLabel={image ? "New Image Preview" : imagePreview ? "Current Image" : undefined}
            errors={errors}
            loading={loading}
            onChange={handleChange}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
        />
    );
}

export default EditProduct;