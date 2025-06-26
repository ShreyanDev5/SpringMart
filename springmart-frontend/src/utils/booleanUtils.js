/**
 * Safely converts a value to boolean
 * @param {*} value - The value to convert
 * @returns {boolean} - The boolean value
 */
export const toBoolean = (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return Boolean(value);
}; 