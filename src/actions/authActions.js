import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants/userConstants';

export function userLogin(user) {
    return {
        type: LOGIN_REQUEST,
        user,
    };
}

export function userLoggedIn() {
    return {
        type: LOGIN_SUCCESS,
    };
}

export function userLoggedOut() {
    return {
        type: LOGIN_FAILURE,
    };
}