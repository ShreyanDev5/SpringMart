// src/components/SearchBar.jsx

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../styles/components/home/Hero.module.scss";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className={styles.searchContainer}>
            <form className={styles.searchWrapper} onSubmit={handleSearch}>
                <FiSearch className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search products"
                />
                <button type="submit" className={styles.searchButton}>
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
