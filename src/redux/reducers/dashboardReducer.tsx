import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET } from '../actions/actionTypes';
import { AnyAction } from 'redux';
import { TListGroupAnyFields } from '../../types/models/listGroups';

export interface IdashboardState {
    loadingDashboard: boolean;
    listGroups: TListGroupAnyFields[];
    error: string | undefined;
}

const initialState: IdashboardState = {
    loadingDashboard: true,
    listGroups: [],
    error: undefined,
};

export default function reducer(state: IdashboardState = initialState, action: AnyAction): IdashboardState {
    const { type, payload } = action;

    switch (type) {
        case DASHBOARD_LISTS_GET:
            return {
                ...state,
                listGroups: payload,
                loadingDashboard: false,
                error: undefined,
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
