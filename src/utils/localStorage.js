/**
 *  Local Storage Helper
 *
 */

/**
 * Sets item to local storage
 * @param key
 * @param value
 */
export const setItem = (key, value) => {
    localStorage.setItem(key, value);
};

/**
 * Gets item from local storage
 * @param key
 * @returns {string}
 */
export const getItem = (key) => {
    return localStorage.getItem(key);
};

/**
 * Removes item from local storage
 * @param key
 */
export const removeItem = (key) => {
    localStorage.removeItem(key);
};