import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET, DASHBOARD_SET_FILTERS } from '../actions/actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import { TListGroupAnyFields } from '../../types/models/listGroups';

// Common
interface IGetListsError {
    type: typeof DASHBAORD_DATA_ERROR;
    payload: string;
}

interface IgetListsSuccess {
    type: typeof DASHBOARD_LISTS_GET;
    payload: TListGroupAnyFields[];
}

// Get Lists

export type TgetDashboardListDataActionCreator = () => void;

export const getDashboardListDataActionCreator =
    () => async (dispatch: Dispatch<IgetListsSuccess | IGetListsError>) => {
        try {
            const res = await axios.get(`/api/groups/user`);
            dispatch({
                type: DASHBOARD_LISTS_GET,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: DASHBAORD_DATA_ERROR, payload: 'error' });
        }
    };

interface IsetFilters {
    type: typeof DASHBOARD_SET_FILTERS;
    payload: {};
}

export type TsetFiltersActionCreator = (
    filter: 'listOwnershipFilter' | 'listVariantFilter',
    selected:
        | 'anyone'
        | 'you'
        | 'others'
        | { basicListSelected: boolean; giftListSelected: boolean; giftGroupSelected: boolean }
) => void;

export const setFiltersActionCreator: TsetFiltersActionCreator =
    (filter, selected) => async (dispatch: Dispatch<IsetFilters>) => {
        dispatch({
            type: DASHBOARD_SET_FILTERS,
            payload: { filter: filter, selected: selected },
        });
    };
