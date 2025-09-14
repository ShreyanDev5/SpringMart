// src/components/UIStates.jsx
import React from "react";
import styles from "../styles/components/UIStates.module.scss";
import { FiRefreshCw, FiShoppingBag, FiAlertCircle } from "react-icons/fi";

export const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className={styles.uiState}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export const EmptyState = ({ 
  title = "No items found", 
  description = "There are no items to display at this time.",
  action,
  icon: Icon = FiShoppingBag
}) => {
  return (
    <div className={styles.uiState}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action && (
        <button 
          className={styles.actionButton}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({ 
  title = "Something went wrong", 
  description = "An error occurred while loading the content. Please try again.",
  onRetry
}) => {
  return (
    <div className={styles.uiState}>
      <div className={styles.iconWrapper}>
        <FiAlertCircle className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {onRetry && (
        <button 
          className={styles.actionButton}
          onClick={onRetry}
        >
          <FiRefreshCw className={styles.buttonIcon} />
          Try Again
        </button>
      )}
    </div>
  );
};