import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET, DASHBOARD_SET_FILTERS } from '../actions/actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import { TgroupMemberAny, TListGroupAnyFields, TProcessedListGroupAnyFields } from '../../types/models/listGroups';
import { findUserInGroup } from '../../misc/helperFunctions';

// Common
interface IGetListsError {
    type: typeof DASHBAORD_DATA_ERROR;
    payload: string | TProcessedListGroupAnyFields[];
}

interface IgetListsSuccess {
    type: typeof DASHBOARD_LISTS_GET;
    payload: TProcessedListGroupAnyFields[] | string;
}

// Get Lists

export type TgetDashboardListDataActionCreator = (userId: string) => void;

export const getDashboardListDataActionCreator =
    (userId: string) => async (dispatch: Dispatch<IgetListsSuccess | IGetListsError>) => {
        try {
            const res = await axios.get(`/api/groups/user`);
            let foundGroups: TListGroupAnyFields[] = res.data;
            if (!foundGroups) {
                dispatch({
                    type: DASHBOARD_LISTS_GET,
                    payload: [],
                });
            } else {
                const processedGroups: TProcessedListGroupAnyFields[] = foundGroups.map((group) => {
                    const foundUser = findUserInGroup(group, userId) as TgroupMemberAny;
                    return { ...group, currentListUser: foundUser };
                });

                dispatch({
                    type: DASHBOARD_LISTS_GET,
                    payload: processedGroups,
                });
            }
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
