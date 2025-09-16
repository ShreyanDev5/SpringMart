// src/components/LoadingMessage.jsx
import React, { useState, useEffect } from "react";
import { FiX, FiRefreshCw, FiClock, FiInfo } from "react-icons/fi";
import styles from "../styles/components/LoadingMessage.module.scss";

const LoadingMessage = ({ onDismiss, onRetry, message = "Loading products..." }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showRenderInfo, setShowRenderInfo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Show Render info after 10 seconds
    const renderInfoTimer = setTimeout(() => {
      setShowRenderInfo(true);
    }, 10000);

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
          {showRenderInfo && (
            <div className={styles.renderInfo}>
              <div className={styles.infoIcon}>
                <FiInfo />
              </div>
              <div className={styles.infoText}>
                <p><strong>Spinning down on idle</strong></p>
                <p>Render spins down a free web service that goes 15 minutes without receiving inbound traffic. Render spins the service back up whenever it next receives a request to process.</p>
                <p>Spinning up a service takes up to a minute, which causes a noticeable delay for incoming requests until the service is back up and running. For example, a browser page load will hang temporarily.</p>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default LoadingMessage;