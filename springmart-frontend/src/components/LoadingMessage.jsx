// src/components/LoadingMessage.jsx
import React, { useState, useEffect } from "react";
import { FiX, FiRefreshCw, FiClock, FiInfo } from "react-icons/fi";
import styles from "../styles/components/LoadingMessage.module.scss";

const LoadingMessage = ({ onDismiss, onRetry, message = "Waking Up the Store" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showRenderInfo, setShowRenderInfo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Show Render info after 5 seconds
    const renderInfoTimer = setTimeout(() => {
      setShowRenderInfo(true);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(renderInfoTimer);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

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
            {timeElapsed > 0 ? `Loading for ${formatTime(timeElapsed)}` : "Initializing..."}
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
            <p><strong>Waking Up the Store</strong></p>
            <p>Our backend service is hosted on Render's free plan. When the site hasn't been visited for a while, the service "sleeps" to save resources.</p>
            <p>When you return, it takes up to a minute to fully "wake up," which may delay loading products on the page.</p>
            <p>👉 Please wait a moment while everything loads. Thank you for your patience!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingMessage;