import { AnyAction } from 'redux';
import { TListGroupAnyFields } from '../../types/models/listGroups';
import {
    CURRENT_LIST_GET,
    DELETE_LIST,
    DELETE_LIST_ITEM,
    LEAVE_LIST,
    LIST_RESET,
    LOAD_LIST_PERMISSIONS,
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
    currentListPermissions: string[] | undefined;
    parentListPermissions: string[] | undefined;
}

const initialState = {
    listLoading: true,
    currentList: undefined,
    parentList: undefined,
    currentListPermissions: undefined,
    parentListPermissions: undefined,
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
            };
        case PARENT_LIST_GET:
            return {
                ...state,
                listLoading: false,
                currentList: undefined,
                parentList: payload,
            };
        case LOAD_LIST_PERMISSIONS:
            return {
                ...state,
                currentListPermissions: payload,
            };
        case DELETE_LIST_ITEM:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
            };
        case NEW_LIST_ITEM:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
            };
        case MODIFY_LIST_ITEM:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
            };
        case SELECT_LIST_ITEM:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
            };
        case RENAME_LIST:
            return {
                ...state,
                listLoading: false,
                currentList: payload,
            };
        case LEAVE_LIST:
            return {
                ...state,
                listLoading: false,
                currentList: undefined,
            };
        case DELETE_LIST:
            return {
                ...initialState,
            };
        default:
            return {
                ...state,
            };
    }
}
