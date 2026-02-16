// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import styles from "../styles/pages/NotFound.module.scss";

function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>Page Not Found</h2>
                <p className={styles.message}>
                    Oops! The page you're looking for seems to have wandered off.
                    It might have been removed, renamed, or didn't exist in the first place.
                </p>
                <Link to="/" className={styles.homeButton}>
                    <FiHome /> Go Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
