import {
    DOCTOR_OBJ
} from '../constants/examConstants';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    doctor: '',
});

/**
 * Reducers
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case DOCTOR_OBJ:
            return state.set('doctor', action.doctor)
        default:
            return state;
    }
};