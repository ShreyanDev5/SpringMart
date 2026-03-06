import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../../styles/components/SearchBar.module.scss";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onSearch(query);
    }

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <FiSearch className={styles.searchIcon} />
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
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