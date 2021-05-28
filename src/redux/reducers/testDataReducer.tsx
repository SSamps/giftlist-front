import { TEST_DATA_ADD, TEST_DATA_DELETE, TEST_DATA_ERROR, TEST_DATA_GET } from '../actions/actionTypes';
import { AnyAction } from 'redux';

export interface ItestDataElement {
    _id: string;
    testVar: string;
}

export interface ItestDataState {
    loading: boolean;
    testData: ItestDataElement[];
    error: { msg: string; status: string } | null;
}

const initialState = {
    loading: true,
    testData: [],
    error: null,
};

export default function reducer(state: ItestDataState = initialState, action: AnyAction): ItestDataState {
    const { type, payload } = action;

    switch (type) {
        case TEST_DATA_GET:
            return {
                ...state,
                testData: payload,
                error: null,
            };
        case TEST_DATA_ADD:
            return {
                ...state,
                testData: payload,
            };
        case TEST_DATA_DELETE:
            return {
                ...state,
                testData: state.testData?.filter((element) => element._id !== payload),
            };
        case TEST_DATA_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
