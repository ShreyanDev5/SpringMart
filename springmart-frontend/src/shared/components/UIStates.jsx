import React from "react";
import { FiAlertCircle, FiRefreshCw, FiShoppingBag } from "react-icons/fi";
import styles from "../../styles/components/UIStates.module.scss";

export function EmptyState({
    title = "No items found",
    description = "There are no items to display at this time.",
    action,
    icon: Icon = FiShoppingBag,
}) {
    return (
        <div className={styles.uiState}>
            <div className={styles.iconWrapper}>
                <Icon className={styles.icon} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            {action && (
                <button className={styles.actionButton} onClick={action.onClick}>
                    {action.label}
                </button>
            )}
        </div>
    );
}

export function ErrorState({
    title = "Something went wrong",
    description = "An error occurred while loading the content. Please try again.",
    onRetry,
}) {
    return (
        <div className={styles.uiState}>
            <div className={styles.iconWrapper}>
                <FiAlertCircle className={styles.icon} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            {onRetry && (
                <button className={styles.actionButton} onClick={onRetry}>
                    <FiRefreshCw className={styles.buttonIcon} />
                    Try Again
                </button>
            )}
        </div>
    );
}