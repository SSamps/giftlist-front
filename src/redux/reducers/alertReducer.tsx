import { AnyAction } from 'redux';
import { ADD_ALERT, REMOVE_ALERT } from '../actions/actionTypes';

interface Ialert {
    type: 'error';
    message: string;
    id: string;
}

export type TalertData = Ialert[];

const initialState: Ialert[] = [];

export default function reducer(state = initialState, action: AnyAction) {
    const { type, payload } = action;

    switch (type) {
        case ADD_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter((alert) => {
                return alert.id !== payload;
            });
        default:
            return [...state];
    }
}
