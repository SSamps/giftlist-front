import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET, DASHBOARD_SET_FILTERS } from '../actions/actionTypes';
import { AnyAction } from 'redux';
import { TProcessedListGroupAnyFields } from '../../types/models/listGroups';

export interface IdashboardState {
    loadingDashboard: boolean;
    listGroups: TProcessedListGroupAnyFields[];
    error: string | undefined;
    listOwnershipFilter: 'anyone' | 'you' | 'others';
    listVariantFilter: { basicListSelected: boolean; giftListSelected: boolean; giftGroupSelected: boolean };
}

const initialState: IdashboardState = {
    loadingDashboard: true,
    listGroups: [],
    error: undefined,
    listOwnershipFilter: 'anyone',
    listVariantFilter: { basicListSelected: true, giftListSelected: true, giftGroupSelected: true },
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
        case DASHBOARD_SET_FILTERS: {
            return { ...state, [payload.filter]: payload.selected };
        }
        default:
            return {
                ...state,
            };
    }
}
