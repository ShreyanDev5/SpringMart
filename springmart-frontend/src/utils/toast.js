import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import React from 'react';

export const showSuccessToast = (message) => {
    toast.success(message, {
        icon: <FaCheckCircle style={{ color: '#2ecc40', fontSize: '1.5em' }} />,
    });
};

export const showErrorToast = (message) => {
    toast.error(message, {
        icon: <FaTimesCircle style={{ color: '#ff4136', fontSize: '1.5em' }} />,
    });
}; 