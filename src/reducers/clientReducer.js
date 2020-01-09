import {
    CLIENT
} from '../constants/userRoles';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    clientID: [],
});

/**
 * Reducers
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case CLIENT:
            return state.set('clientID', action.client)
        default:
            return state;
    }
};