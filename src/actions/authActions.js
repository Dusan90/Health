import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants/userConstants';

export function userLogin(user) {
    return {
        type: LOGIN_REQUEST,
        isLoggedIn: false,
        user,
    };
}

export function userLoggedIn() {
    return {
        type: LOGIN_SUCCESS,
        isLoggedIn: true,
    };
}

export function userLoggedOut() {
    return {
        type: LOGIN_FAILURE,
        isLoggedIn: false,
    };
}