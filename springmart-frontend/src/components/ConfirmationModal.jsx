// src/components/ConfirmationModal.jsx
import React, { useEffect } from 'react';
import styles from '../styles/components/ConfirmationModal.module.scss';
import { FiAlertTriangle, FiInfo, FiCheckCircle } from 'react-icons/fi';
import ReactDOM from 'react-dom';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "danger", // danger, warning, info
  loading = false
}) => {
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, loading]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
      case 'warning':
        return <FiAlertTriangle />;
      case 'info':
        return <FiInfo />;
      case 'success':
        return <FiCheckCircle />;
      default:
        return <FiAlertTriangle />;
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div 
        className={styles.modalContent} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        <div className={`${styles.iconWrapper} ${styles[type]}`}>
          {getIcon()}
        </div>
        
        <div className={styles.textContainer}>
          <h3 id="modal-title" className={styles.title}>{title}</h3>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.actions}>
          <button 
            className={`${styles.button} ${styles.cancelButton}`} 
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            className={`${styles.button} ${styles.confirmButton} ${styles[type]}`} 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
