// src/components/SearchBar.jsx

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../styles/components/SearchBar.module.scss";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSearch}>
            <FiSearch className={styles.searchIcon} />
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
                Search
            </button>
        </form>
    );
}

export default SearchBar;
