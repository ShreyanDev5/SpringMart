const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

function resolveApiBaseUrl() {
    const configuredBaseUrl = process.env.REACT_APP_API_BASE_URL?.trim();

    if (configuredBaseUrl) {
        return configuredBaseUrl.replace(/\/$/, "");
    }

    if (typeof window !== "undefined" && LOCAL_HOSTS.has(window.location.hostname)) {
        return `${window.location.protocol}//${window.location.hostname}:8080`;
    }

    return "";
}

const API_BASE_URL = resolveApiBaseUrl();
const API_PREFIX = `${API_BASE_URL}/api`;

async function parseResponse(response) {
    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return response.json();
    }

    return response.text();
}

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_PREFIX}${endpoint}`, options);
    const payload = await parseResponse(response);

    if (!response.ok) {
        const message = payload?.message || payload || `${options.method || "GET"} ${endpoint} failed`;
        const error = new Error(message);
        error.status = response.status;
        error.payload = payload;
        throw error;
    }

    return {
        status: response.status,
        data: payload,
    };
}

function mapProductCollection(data, fallbackPageSize) {
    if (Array.isArray(data)) {
        return {
            items: data,
            hasMore: data.length === fallbackPageSize,
        };
    }

    if (Array.isArray(data?.content)) {
        return {
            items: data.content,
            hasMore: (data.number ?? 0) < ((data.totalPages ?? 0) - 1),
        };
    }

    return {
        items: [],
        hasMore: false,
    };
}

export async function getProductsPage(page = 0, size = 12) {
    const { status, data } = await request(`/products?page=${page}&size=${size}`);

    if (status === 204 || !data) {
        return { items: [], hasMore: false };
    }

    return mapProductCollection(data, size);
}

export async function getFeaturedProducts(size = 3) {
    const result = await getProductsPage(0, size);
    return result.items;
}

export async function searchProducts(keyword) {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
        return [];
    }

    const { status, data } = await request(`/products/search?keyword=${encodeURIComponent(trimmedKeyword)}`);

    if (status === 204 || !data) {
        return [];
    }

    return Array.isArray(data) ? data : [];
}

export async function getProductById(id) {
    const { data } = await request(`/products/${id}`);
    return data;
}

export async function createProduct(formData) {
    return request("/products", {
        method: "POST",
        body: formData,
    });
}

export async function updateProduct(id, formData) {
    return request(`/products/${id}`, {
        method: "PUT",
        body: formData,
    });
}

export async function deleteProduct(id) {
    const { status } = await request(`/products/${id}`, {
        method: "DELETE",
    });

    return status;
}

export function getProductImageUrl(id, imageVersion) {
    const versionSuffix = imageVersion ? `?v=${imageVersion}` : "";
    return `${API_PREFIX}/products/image/${id}${versionSuffix}`;
}

export function getApiBaseUrl() {
    return API_BASE_URL;
}