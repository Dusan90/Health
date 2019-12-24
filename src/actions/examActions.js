import {
    EXAM_PRICE
} from '../constants/examConstants';

export function examPrice(price) {
    return {
        type: EXAM_PRICE,
        price,
    };
}