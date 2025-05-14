// src/services/api.js

const BASE_URL = "http://localhost:8080/api";

// Generic GET request
export async function getData(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (!res.ok) throw new Error(`GET ${endpoint} failed`);
        return await res.json();
    } catch (error) {
        console.error("API GET error:", error.message);
        throw error;
    }
}

// Generic POST (with JSON)
export async function postData(endpoint, data) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`POST ${endpoint} failed`);
        return await res.json();
    } catch (error) {
        console.error("API POST error:", error.message);
        throw error;
    }
}

// POST or PUT with FormData (for multipart)
export async function sendFormData(endpoint, method, formData) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: method,
            body: formData
        });
        if (!res.ok) throw new Error(`${method} ${endpoint} failed`);
        return await res.json();
    } catch (error) {
        console.error("API FormData error:", error.message);
        throw error;
    }
}

// DELETE request
export async function deleteData(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
        return res.status; // 204 expected
    } catch (error) {
        console.error("API DELETE error:", error.message);
        throw error;
    }
}
