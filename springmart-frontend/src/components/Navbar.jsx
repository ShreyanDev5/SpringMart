// src/components/Navbar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./../styles/Navbar.css";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/logo.png" alt="SpringMart Logo" className="navbar-logo-img" />
                <span className="navbar-brand">SpringMart</span>
            </div>
            <div className="navbar-links">
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
                <Link to="/add" className={location.pathname === "/add" ? "active" : ""}>Add Product</Link>
            </div>
        </nav>
    );
}

export default Navbar;
