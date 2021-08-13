import { AnyAction } from 'redux';
import { TListGroupAnyFields } from '../../types/models/listGroups';
import {
    CURRENT_LIST_GET,
    DELETE_LIST,
    DELETE_LIST_ITEM,
    LIST_ERROR,
    LIST_RESET,
    MODIFY_LIST_ITEM,
    NEW_LIST_ITEM,
    PARENT_LIST_GET,
    RENAME_LIST,
    SELECT_LIST_ITEM,
} from '../actions/actionTypes';

export interface IlistGroupData {
    listLoading: boolean;
    currentList: undefined | TListGroupAnyFields;
    parentList: undefined | TListGroupAnyFields;
    listError: undefined | { status: number; data: string };
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
        case LIST_RESET:
            return {
                ...initialState,
            };
        case CURRENT_LIST_GET:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
                parentList: undefined,
                listError: undefined,
            };
        case PARENT_LIST_GET:
            return {
                ...state,
                listLoading: false,
                currentList: undefined,
                parentList: payload,
                listError: undefined,
            };
        case DELETE_LIST_ITEM:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
                listError: undefined,
            };
        case NEW_LIST_ITEM:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
                listError: undefined,
            };
        case MODIFY_LIST_ITEM:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
                listError: undefined,
            };
        case SELECT_LIST_ITEM:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
                listError: undefined,
            };
        case RENAME_LIST:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
                listError: undefined,
            };
        case DELETE_LIST:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
                listError: undefined,
            };
        case LIST_ERROR:
            return {
                listLoading: true,
                currentList: undefined,
                parentList: undefined,
                listError: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
