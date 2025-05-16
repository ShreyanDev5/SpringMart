// src/components/Navbar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/components/Navbar.module.scss";

function Navbar() {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src="/logo.png" alt="SpringMart Logo" className={styles.logoImg} />
                <span className={styles.brand}>SpringMart</span>
            </div>
            <div className={styles.links}>
                <Link to="/" className={location.pathname === "/" ? styles.active : ""}>Home</Link>
                <Link to="/add" className={location.pathname === "/add" ? styles.active : ""}>Add Product</Link>
                <Link to="/products" className={location.pathname === "/products" ? styles.active : ""}>View Products</Link>
            </div>
        </nav>
    );
}

export default Navbar;
