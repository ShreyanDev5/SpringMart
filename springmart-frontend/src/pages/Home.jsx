// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { Hero, Features, CtaBanner } from "../components/home";
import Products from "../components/home/Products";
import { getFeaturedProducts, searchProducts } from "../features/products/api";

function Home({ searchQuery, imageVersion, refreshTrigger = 0 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reloadToken, setReloadToken] = useState(0);
    const productsSectionRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        async function loadProducts() {
            setLoading(true);
            setError("");

            try {
                const nextProducts = searchQuery.trim()
                    ? await searchProducts(searchQuery)
                    : await getFeaturedProducts(3);

                if (isMounted) {
                    setProducts(nextProducts);
                }
            } catch {
                if (isMounted) {
                    setError("Failed to load products.");
                    setProducts([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, [refreshTrigger, reloadToken, searchQuery]);

    function handleReload() {
        setReloadToken((currentToken) => currentToken + 1);
    }

    useEffect(() => {
        if (!searchQuery) {
            return undefined;
        }

        const scrollTimer = setTimeout(() => {
            productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);

        return () => clearTimeout(scrollTimer);
    }, [searchQuery]);

    return (
        <div className="home-container">
            <Hero />
            <section ref={productsSectionRef} className="section">
                <Products 
                    products={products} 
                    loading={loading} 
                    error={error} 
                    imageVersion={imageVersion}
                    onProductDelete={handleReload}
                    onRetry={handleReload}
                />
            </section>
            <Features />
            <CtaBanner />
        </div>
    );
}

export default Home;
