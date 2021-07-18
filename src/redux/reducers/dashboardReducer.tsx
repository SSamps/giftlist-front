import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET, DASHBOARD_SET_FILTERS } from '../actions/actionTypes';
import { AnyAction } from 'redux';
import { TListGroupAnyFields } from '../../types/models/listGroups';
import { BASIC_LIST, GIFT_GROUP, GIFT_LIST, TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../types/listVariants';

export interface IdashboardState {
    loadingDashboard: boolean;
    listGroups: TListGroupAnyFields[];
    error: string | undefined;
    listOwnershipFilter: 'anyone' | 'you' | 'others';
    listVariantFilter: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS[];
}

const initialState: IdashboardState = {
    loadingDashboard: true,
    listGroups: [],
    error: undefined,
    listOwnershipFilter: 'anyone',
    listVariantFilter: [BASIC_LIST, GIFT_LIST, GIFT_GROUP],
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
