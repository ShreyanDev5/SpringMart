// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/Navbar.css";

function Navbar({ onSearch }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close mobile menu when a link is clicked
    const closeMenu = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Add handler for Home link
    const handleHomeClick = (e) => {
        if (location.pathname === "/") {
            // Already on home page
            if (window.scrollY > 100) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            // Prevent navigation (no reload)
            e.preventDefault();
        }
        // else, let Link handle navigation
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <div className="logo">
                        <img src="/SpringMart_Logo_1.1.png" alt="SpringMart Logo" className="logo-img" />
                        <span className="brand">SpringMart</span>
                    </div>
                </div>

                <div className="navbar-center">
                    {/* Search bar only visible in header on desktop, not on mobile */}
                    {!isMobile && (
                        <div className="search-container">
                            <SearchBar onSearch={onSearch} />
                        </div>
                    )}
                </div>

                <div className="navbar-right">
                    {/* Hamburger menu button (mobile only) - moved here to the right */}
                    <button 
                        className={`hamburger ${isOpen ? 'is-active' : ''}`} 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                    <div className="desktop-nav">
                        <Link 
                            to="/" 
                            className={location.pathname === "/" ? "active" : ""}
                            onClick={handleHomeClick}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/add" 
                            className={location.pathname === "/add" ? "active" : ""}
                        >
                            Add Product
                        </Link>
                        <Link 
                            to="/products" 
                            className={location.pathname === "/products" ? "active" : ""}
                        >
                            View Products
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile search and navigation (only visible on mobile) */}
            {isMobile && (
                <div className={`mobile-menu ${isOpen ? 'show' : ''}`}>
                    {isOpen && (
                        <div className="mobile-search">
                            <SearchBar onSearch={onSearch} />
                        </div>
                    )}
                    <div className="mobile-links">
                        <Link 
                            to="/" 
                            className={location.pathname === "/" ? "active" : ""}
                            onClick={(e) => { handleHomeClick(e); closeMenu(); }}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/add" 
                            className={location.pathname === "/add" ? "active" : ""}
                            onClick={closeMenu}
                        >
                            Add Product
                        </Link>
                        <Link 
                            to="/products" 
                            className={location.pathname === "/products" ? "active" : ""}
                            onClick={closeMenu}
                        >
                            View Products
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
