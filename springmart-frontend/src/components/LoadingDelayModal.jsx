// src/components/LoadingDelayModal.jsx
import React, { useState, useEffect } from "react";
import styles from "../styles/components/LoadingDelayModal.module.scss";

const LoadingDelayModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown

  useEffect(() => {
    let timer;
    if (isOpen && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, timeLeft]);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Welcome to SpringMart Showcase</h2>
        </div>
        
        <div className={styles.modalContent}>
          <div className={styles.iconWrapper}>
            <svg 
              className={styles.infoIcon} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          
          <p className={styles.modalText}>
            Thank you for visiting! Our showcase app is hosted on Render's free tier, 
            which automatically spins down after 15 minutes of inactivity.
          </p>
          
          <p className={styles.modalText}>
            <strong>This may cause a delay of up to a minute</strong> when loading products 
            for the first time. We appreciate your patience as we get everything ready for you.
          </p>
          
          <div className={styles.countdownContainer}>
            <p className={styles.countdownText}>
              {timeLeft > 0 
                ? `Please wait up to ${timeLeft} seconds, or:` 
                : "Ready to load content now!"}
            </p>
          </div>
        </div>
        
        <div className={styles.modalActions}>
          <button 
            className={styles.refreshButton}
            onClick={handleRefresh}
          >
            Refresh Page
          </button>
          <button 
            className={styles.continueButton}
            onClick={onClose}
            disabled={timeLeft > 0}
          >
            {timeLeft > 0 ? `Wait (${timeLeft}s)` : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingDelayModal;