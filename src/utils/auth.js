import { getItem, removeItem, setItem } from "./localStorage";
import { USER } from '../constants/localStorageList';
import {
    USER as USER_ROLE,
} from '../constants/userRoles';

/**
 * Check is user authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!getItem(USER);
};

/**
 * Authenticate user
 * @param user
 */
export const authenticate = (user) => {
    setItem(USER, user);
};
/**
 * Unauthenticate user
 */
export const unauthenticate = () => {
  removeItem(USER);
};

/**
 * Get user permission
 * @returns {string}
 */
export const getPermission = () => {
    const user = JSON.parse(getItem(USER));
    return user.role;
};

export const isUser = () => {
    const a = getItem(USER);
    if (a[0] === '{') { //this is hack for production todo: fix
        const user = JSON.parse(getItem(USER));
        return user.role === USER_ROLE;
    }
    return false;
};