// src/components/SearchBar.jsx

import React, { useState, useEffect } from "react";
import styles from "../styles/components/SearchBar.module.scss";

function SearchBar({ onSearch, onFilter }) {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState("");

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // 300ms debounce delay

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    const handleFilterChange = () => {
        onFilter({ category, priceRange });
    };

    return (
        <div className={styles.searchBarContainer}>
            <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="button" onClick={() => onSearch(query)}>
                    Search
                </button>
            </form>
            <div className={styles.filters}>
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        handleFilterChange();
                    }}
                >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                </select>
                <select
                    value={priceRange}
                    onChange={(e) => {
                        setPriceRange(e.target.value);
                        handleFilterChange();
                    }}
                >
                    <option value="">All Prices</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                </select>
            </div>
        </div>
    );
}

export default SearchBar;
