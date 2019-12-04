import { fromJS } from 'immutable';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../constants/userConstants';

const initialState = fromJS({
    isLoggedIn: false,
});

/**
 * Reducers
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state.set('user', action.user);
        case LOGIN_SUCCESS:
            return state.set('isLoggedIn', true)
        case LOGIN_FAILURE:
            return state.set('isLoggedIn', false)
        default:
            return state;
    }
};