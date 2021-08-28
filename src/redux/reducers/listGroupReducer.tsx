import { AnyAction } from 'redux';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../types/listGroupPermissions';
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
    RENAME_LIST,
    SELECT_LIST_ITEM,
} from '../actions/actionTypes';

export interface IlistGroupData {
    listLoading: boolean;
    currentList: undefined | TListGroupAnyFields;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[] | undefined;
}

export interface IlistGroupDataCurrentListLoaded {
    listLoading: boolean;
    currentList: TListGroupAnyFields;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[];
}

export interface IlistGroupDataParentListLoaded {
    listLoading: boolean;
    currentList: TListGroupAnyFields;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[];
}

const initialState = {
    listLoading: true,
    currentList: undefined,
    currentListPermissions: undefined,
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
