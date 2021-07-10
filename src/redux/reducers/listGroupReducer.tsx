import { AnyAction } from 'redux';
import { TListGroupAnyFields } from '../../types/models/listGroups';
import { CURRENT_LIST_GET, LIST_ERROR, PARENT_LIST_GET } from '../actions/actionTypes';

export interface IlistGroupData {
    listLoading: boolean;
    currentList: undefined | TListGroupAnyFields;
    parentList: undefined | TListGroupAnyFields;
    listError: undefined | { response: { status: number; data: string } };
}

const initialState = {
    listLoading: true,
    currentList: undefined,
    parentList: undefined,
    listError: undefined,
};

export default function reducer(state: IlistGroupData = initialState, action: AnyAction): IlistGroupData {
    const { type, payload } = action;

    switch (type) {
        case CURRENT_LIST_GET:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
                listError: undefined,
            };
        case PARENT_LIST_GET:
            return {
                ...state,
                listLoading: false,
                parentList: payload,
                listError: undefined,
            };
        case LIST_ERROR:
            return {
                ...state,
                listLoading: false,
                listError: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
