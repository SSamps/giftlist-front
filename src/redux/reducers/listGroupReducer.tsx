import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET } from '../actions/actionTypes';
import { AnyAction } from 'redux';
import { TListGroupAnyFields } from '../../types/models/listGroups';

export interface IlistGroupState {
    loading: boolean;
    listGroups: TListGroupAnyFields[];
    error: string | null;
}

const initialState: IlistGroupState = {
    loading: true,
    listGroups: [],
    error: null,
};

export default function reducer(state: IlistGroupState = initialState, action: AnyAction): IlistGroupState {
    const { type, payload } = action;

    switch (type) {
        case DASHBOARD_LISTS_GET:
            return {
                listGroups: payload,
                loading: false,
                error: null,
            };
        case DASHBAORD_DATA_ERROR:
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
