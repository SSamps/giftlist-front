import { LIST_DATA_ERROR, LIST_GET } from '../actions/actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import { TListGroupAnyFields } from '../../types/models/listGroups';

// Common
interface IGetListError {
    type: typeof LIST_DATA_ERROR;
    payload: string;
}

interface IgetListSuccess {
    type: typeof LIST_GET;
    payload: TListGroupAnyFields[];
}

// Get Lists

export type TgetListActionCreator = (listid: string) => void;

export const getListActionCreator = (listid: string) => async (dispatch: Dispatch<IgetListSuccess | IGetListError>) => {
    try {
        const res = await axios.get(`/api/groups/${listid}`);
        dispatch({
            type: LIST_GET,
            payload: res.data,
        });
    } catch (err) {
        dispatch({ type: LIST_DATA_ERROR, payload: 'error' });
    }
};
