import React from "react";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import styles from "../styles/components/Toast.module.scss";

function ToastContent({ type, message }) {
    function getIcon() {
        switch (type) {
            case "success":
                return <FaCheckCircle style={{ color: "#10b981" }} />;
            case "error":
                return <FaTimesCircle style={{ color: "#ef4444" }} />;
            default:
                return <FaInfoCircle style={{ color: "#3b82f6" }} />;
        }
    }

    return (
        <div className={styles.toastContent}>
            <div className={styles.toastIcon}>{getIcon()}</div>
            <div className={styles.toastMessage}>{message}</div>
            <button
                className={styles.toastCloseButton}
                onClick={(event) => {
                    event.stopPropagation();
                    toast.dismiss();
                }}
                aria-label="Close notification"
            >
                <FiX />
            </button>
        </div>
    );
}

export function showSuccessToast(message) {
    toast.success(<ToastContent type="success" message={message} />, {
        icon: false,
        closeButton: false,
        autoClose: 3000,
    });
}

export function showErrorToast(message) {
    toast.error(<ToastContent type="error" message={message} />, {
        icon: false,
        closeButton: false,
        autoClose: 5000,
    });
}

export function showInfoToast(message) {
    toast.info(<ToastContent type="info" message={message} />, {
        icon: false,
        closeButton: false,
        autoClose: 4000,
    });
}