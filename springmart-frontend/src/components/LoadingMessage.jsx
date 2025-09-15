// src/components/LoadingMessage.jsx
import React, { useState, useEffect } from "react";
import { FiX, FiRefreshCw, FiClock } from "react-icons/fi";
import styles from "../styles/components/LoadingMessage.module.scss";

const LoadingMessage = ({ onDismiss, onRetry, message = "Loading products..." }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
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
          <button 
            className={styles.dismissButton} 
            onClick={handleDismiss}
            aria-label="Dismiss loading message"
          >
            <FiX />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;