import {
    EXAM_PRICE
} from '../constants/examConstants';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    price: '',
});

/**
 * Reducers
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case EXAM_PRICE:
            return state.set('price', action.price)
        default:
            return state;
    }
};