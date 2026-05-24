import React, { useState } from "react";
import { FiInfo, FiX } from "react-icons/fi";
import styles from "../../styles/components/LoadingMessage.module.scss";

function LoadingMessage({ onDismiss, onRetry, message = "Waking Up the Store" }) {
    const [isVisible, setIsVisible] = useState(true);

    function handleDismiss() {
        setIsVisible(false);

        if (onDismiss) {
            onDismiss();
        }
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div className={styles.loadingMessage}>
            {/* Elegant horizontal loading progress bar at the top */}
            <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
            </div>

            <div className={styles.loadingContent}>
                {/* Premium custom Apple-style infinite rotation loader */}
                <div className={styles.loaderContainer}>
                    <svg viewBox="0 0 24 24" fill="none" className={styles.spinnerSvg}>
                        <circle cx="12" cy="12" r="10" stroke="rgba(0, 102, 204, 0.12)" strokeWidth="2.5" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#0066cc" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </div>

                <div className={styles.textContainer}>
                    <h4 className={styles.message}>{message}</h4>
                    <p className={styles.timeInfo}>This may take a moment (2–5 min.)</p>
                </div>

                <div className={styles.actions}>
                    {onDismiss && (
                        <button
                            className={styles.dismissButton}
                            onClick={handleDismiss}
                            aria-label="Dismiss loading message"
                        >
                            <FiX />
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.renderInfo}>
                <div className={styles.infoIcon}>
                    <FiInfo />
                </div>
                <div className={styles.infoText}>
                    <p>Backend hosted on Render’s free tier. The first request after inactivity may take 2–5 minutes to wake up.</p>
                </div>
            </div>
        </div>
    );
}

export default LoadingMessage;