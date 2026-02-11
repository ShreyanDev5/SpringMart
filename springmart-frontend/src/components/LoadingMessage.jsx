// src/components/LoadingMessage.jsx
import React, { useState, useEffect } from "react";
import { FiX, FiRefreshCw, FiClock, FiInfo } from "react-icons/fi";
import styles from "../styles/components/LoadingMessage.module.scss";

const LoadingMessage = ({ onDismiss, onRetry, message = "Waking Up the Store" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showRenderInfo, setShowRenderInfo] = useState(false);

  useEffect(() => {
    // Show Render info after 5 seconds
    const renderInfoTimer = setTimeout(() => {
      setShowRenderInfo(true);
    }, 5000);

    return () => {
      clearTimeout(renderInfoTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.loadingMessage}>
      <div className={styles.loadingContent}>
        <div className={styles.iconContainer}>
          <FiClock className={styles.loadingIcon} />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.message}>{message}</p>
          <p className={styles.timeInfo}>
            This may take a moment (2–5 min.)
          </p>
        </div>
        <div className={styles.actions}>
          {onRetry && (
            <button
              className={styles.retryButton}
              onClick={onRetry}
              aria-label="Retry loading"
            >
              <FiRefreshCw />
            </button>
          )}
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
      {showRenderInfo && (
        <div className={styles.renderInfo}>
          <div className={styles.infoIcon}>
            <FiInfo />
          </div>
          <div className={styles.infoText}>
            <p>Backend hosted on Render free tier — first request after inactivity may take 2–5 minutes to wake up. Thank you for your patience.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingMessage;