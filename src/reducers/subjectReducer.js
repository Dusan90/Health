import {
    SUBJECT
} from '../constants/examConstants';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    subject: '',
});

/**
 * Reducers
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case SUBJECT:
            return state.set('subject', action.subject)
        default:
            return state;
    }
};