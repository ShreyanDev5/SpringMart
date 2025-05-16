// src/components/SearchBar.jsx

import React, { useState, useEffect } from "react";
import styles from "../styles/components/SearchBar.module.scss";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

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

    // Filter functionality removed

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
        </div>
    );
}

export default SearchBar;
