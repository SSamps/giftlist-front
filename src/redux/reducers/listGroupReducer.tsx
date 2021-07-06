import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET, LIST_DATA_ERROR, LIST_GET } from '../actions/actionTypes';
import { AnyAction } from 'redux';
import { TListGroupAnyFields } from '../../types/models/listGroups';

export interface IdashboardState {
    loadingDashboard: boolean;
    listGroups: TListGroupAnyFields[];
    error: string | null;
}

export interface IlistGroupState {
    loadingDashboard: boolean;
    loadingCurrentList: boolean;
    listGroups: TListGroupAnyFields[];
    error: string | null;
    currentList: null | { _id: string };
}

const initialState: IlistGroupState = {
    loadingDashboard: true,
    listGroups: [],
    error: null,
    loadingCurrentList: true,
    currentList: null,
};

export default function reducer(state: IlistGroupState = initialState, action: AnyAction): IlistGroupState {
    const { type, payload } = action;

    switch (type) {
        case DASHBOARD_LISTS_GET:
            return {
                ...state,
                listGroups: payload,
                loadingDashboard: false,
                error: null,
            };
        case DASHBAORD_DATA_ERROR:
            return {
                ...state,
                error: payload,
            };
        case LIST_GET:
            return { ...state, currentList: payload, loadingCurrentList: false };
        case LIST_DATA_ERROR:
            return { ...state, currentList: null, loadingCurrentList: false };
        default:
            return {
                ...state,
            };
    }
}
