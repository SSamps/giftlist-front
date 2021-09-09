import { AnyAction } from 'redux';
import {
    IbasicListMember,
    IgiftGroupMember,
    IgiftListMember,
    TbasicListFields,
    TgiftGroupFields,
    TgiftListFieldsCensored,
    TListGroupAnyFields,
} from '../../types/models/listGroups';
import {
    CURRENT_LIST_GET,
    DELETE_LIST,
    DELETE_LIST_ITEM,
    LEAVE_LIST,
    LIST_RESET,
    LOAD_CURRENT_LIST_USER,
    MODIFY_LIST_ITEM,
    NEW_LIST_ITEM,
    RENAME_LIST,
    SELECT_LIST_ITEM,
} from '../actions/actionTypes';

export interface IlistGroupData {
    listLoading: boolean;
    currentList: undefined | TListGroupAnyFields;
    currentListUser: IbasicListMember | IgiftListMember | IgiftGroupMember | undefined;
}

export interface IunknownListLoaded {
    listLoading: boolean;
    currentList: TbasicListFields | TgiftListFieldsCensored | TgiftGroupFields;
    currentListUser: IbasicListMember | IgiftListMember | IgiftGroupMember;
}

export interface IbasicListLoaded {
    listLoading: boolean;
    currentList: TbasicListFields;
    currentListUser: IbasicListMember;
}

export interface IgiftListLoaded {
    listLoading: boolean;
    currentList: TgiftListFieldsCensored;
    currentListUser: IgiftListMember;
}

export interface IgiftGroupLoaded {
    listLoading: boolean;
    currentList: TgiftGroupFields;
    currentListUser: IgiftGroupMember;
}

const initialState = {
    listLoading: true,
    currentList: undefined,
    currentListUser: undefined,
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
        case LOAD_CURRENT_LIST_USER:
            return {
                ...state,
                currentListUser: payload,
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
