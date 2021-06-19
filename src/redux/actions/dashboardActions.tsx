import { DASHBAORD_DATA_ERROR, DASHBOARD_LISTS_GET } from '../actions/actionTypes';
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
            console.log(res);
            dispatch({
                type: DASHBOARD_LISTS_GET,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: DASHBAORD_DATA_ERROR, payload: 'error' });
        }
    };
