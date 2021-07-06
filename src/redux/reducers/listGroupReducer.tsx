import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET, LIST_DATA_ERROR, LIST_GET } from '../actions/actionTypes';
import { AnyAction } from 'redux';
import { TListGroupAnyFields } from '../../types/models/listGroups';

export interface IlistGroupState {
    loading: boolean;
    listGroups: TListGroupAnyFields[];
    error: string | null;
    currentList: null | { _id: string };
}

const initialState: IlistGroupState = {
    loading: true,
    listGroups: [],
    error: null,
    currentList: null,
};

export default function reducer(state: IlistGroupState = initialState, action: AnyAction): IlistGroupState {
    const { type, payload } = action;

    switch (type) {
        case DASHBOARD_LISTS_GET:
            return {
                ...state,
                listGroups: payload,
                loading: false,
                error: null,
            };
        case DASHBAORD_DATA_ERROR:
            return {
                ...state,
                error: payload,
            };
        case LIST_GET:
            return { ...state, currentList: payload };
        case LIST_DATA_ERROR:
            return { ...state, currentList: null };
        default:
            return {
                ...state,
            };
    }
}
