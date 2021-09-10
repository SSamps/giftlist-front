import {
    CURRENT_LIST_GET,
    PARENT_LIST_GET,
    DELETE_LIST_ITEM,
    LIST_RESET,
    NEW_LIST_ITEM,
    MODIFY_LIST_ITEM,
    SELECT_LIST_ITEM,
    DELETE_LIST,
    RENAME_LIST,
    LEAVE_LIST,
    LOAD_CURRENT_LIST_USER,
} from './actionTypes';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { TListGroupAnyFields } from '../../types/models/listGroups';
import { findUserInGroup } from '../../misc/helperFunctions';
import { addAlertActionCreator } from './alertActions';

interface IgetListActionSuccess {
    type: typeof CURRENT_LIST_GET;
    payload?: TListGroupAnyFields;
}

interface IgetParentListActionSuccess {
    type: typeof PARENT_LIST_GET;
    payload?: TListGroupAnyFields;
}

export type TgetListActionCreator = (listid: string) => void;

export const getListActionCreator =
    (listId: string) => async (dispatch: Dispatch<IgetListActionSuccess | IgetParentListActionSuccess>) => {
        try {
            const res: AxiosResponse<TListGroupAnyFields> = await axios.get(`/api/groups/${listId}`);
            dispatch({
                type: CURRENT_LIST_GET,
                payload: res.data,
            });
        } catch (err) {
            addAlertActionCreator('error', `${err.response.status} ${err.response.data}`);
        }
    };

interface IdeleteListItemActionSuccess {
    type: typeof DELETE_LIST_ITEM;
    payload?: TListGroupAnyFields;
}

export type TdeleteListItemActionCreator = (listId: string, listItemIds: string[]) => Promise<boolean>;

export const deleteListItemActionCreator =
    (listId: string, listItemIds: string[]) => async (dispatch: Dispatch<IdeleteListItemActionSuccess>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: { itemsToDelete: listItemIds },
        };

        try {
            let res = await axios.delete(`/api/groups/${listId}/items`, config);
            dispatch({
                type: DELETE_LIST_ITEM,
                payload: res.data,
            });
            return true;
        } catch (err) {
            addAlertActionCreator('error', `${err.response.status} ${err.response.data}`);
            return false;
        }
    };

interface IresetList {
    type: typeof LIST_RESET;
}

export type TresetListActionCreator = () => void;

export const resetListActionCreator = () => (dispatch: Dispatch<IresetList>) => {
    dispatch({ type: LIST_RESET });
};

interface InewListItemActionSuccess {
    type: typeof NEW_LIST_ITEM;
}

export type TnewListItemActionCreator = (
    body: string,
    links: string[],
    type: 'listItem' | 'secretListItem',
    groupId: string
) => Promise<boolean>;

export const newListItemActionCreator =
    (body: string, links: string[], type: 'listItem' | 'secretListItem', groupId: string) =>
    async (dispatch: Dispatch<InewListItemActionSuccess>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const reqBody = JSON.stringify({ type, body, links });

        try {
            const res = await axios.post(`/api/groups/${groupId}/items`, reqBody, config);

            dispatch({
                type: NEW_LIST_ITEM,
                payload: res.data,
            });
            return true;
        } catch (err) {
            addAlertActionCreator('error', `${err.response.status} ${err.response.data}`);
            return false;
        }
    };

interface ImodifyListItemActionSuccess {
    type: typeof MODIFY_LIST_ITEM;
}

export type TmodifyListItemActionCreator = (
    body: string,
    links: string[],
    itemId: string,
    groupId: string
) => Promise<boolean>;

export const modifyListItemActionCreator =
    (body: string, links: string[], itemId: string, groupId: string) =>
    async (dispatch: Dispatch<ImodifyListItemActionSuccess>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const reqBody = JSON.stringify({ body, links });

        try {
            const res = await axios.put(`/api/groups/${groupId}/items/${itemId}`, reqBody, config);

            dispatch({
                type: MODIFY_LIST_ITEM,
                payload: res.data,
            });
            return true;
        } catch (err) {
            addAlertActionCreator('error', `${err.response.status} ${err.response.data}`);
            return false;
        }
    };

interface IselectListItemActionSuccess {
    type: typeof SELECT_LIST_ITEM;
}

export type TselectListItemActionCreator = (action: 'SELECT' | 'DESELECT', itemId: string, groupId: string) => void;

export const selectListItemActionCreator: TselectListItemActionCreator =
    (action, itemId, groupId) => async (dispatch: Dispatch<IselectListItemActionSuccess>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const reqBody = JSON.stringify({ action: action });

        try {
            const res = await axios.put(`/api/groups/${groupId}/items/${itemId}/select`, reqBody, config);

            dispatch({
                type: SELECT_LIST_ITEM,
                payload: res.data,
            });
        } catch (err) {
            addAlertActionCreator('error', `${err.response.status} ${err.response.data}`);
        }
    };

interface IdeleteListSuccess {
    type: typeof DELETE_LIST;
}

export type TdeleteListActionCreator = (groupId: string) => Promise<boolean>;

export const deleteListActionCreator = (groupId: string) => async (dispatch: Dispatch<IdeleteListSuccess>) => {
    try {
        await axios.delete(`/api/groups/${groupId}/delete`);

        dispatch({
            type: DELETE_LIST,
        });
        return true;
    } catch (err) {
        addAlertActionCreator('error', `${err.response.status} ${err.response.data}`);
        return false;
    }
};

interface IrenameListSuccess {
    type: typeof RENAME_LIST;
}

export type TrenameListActionCreator = (groupId: string, newName: string) => Promise<boolean>;

export const renameListActionCreator =
    (groupId: string, newName: string) => async (dispatch: Dispatch<IrenameListSuccess>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const reqBody = JSON.stringify({ newName: newName });

        try {
            const res = await axios.put(`/api/groups/${groupId}/rename`, reqBody, config);

            dispatch({
                type: RENAME_LIST,
                payload: res.data,
            });

            return true;
        } catch (err) {
            addAlertActionCreator('error', `${err.response.status} ${err.response.data}`);
            return false;
        }
    };

interface IleaveListSuccess {
    type: typeof LEAVE_LIST;
}

export type TleaveListActionCreator = (groupId: string) => Promise<boolean>;

export const leaveListActionCreator = (groupId: string) => async (dispatch: Dispatch<IleaveListSuccess>) => {
    try {
        const res = await axios.put(`/api/groups/${groupId}/leave`);

        dispatch({
            type: LEAVE_LIST,
            payload: res.data,
        });
        return true;
    } catch (err) {
        addAlertActionCreator('error', `${err.response.status} ${err.response.data}`);
        return false;
    }
};

interface IloadListUser {
    type: typeof LOAD_CURRENT_LIST_USER;
}

export type TloadListUserActionCreator = (currentList: TListGroupAnyFields | undefined, userId: string) => void;

export const loadListUserActionCreator: TloadListUserActionCreator =
    (currentList, userId) => async (dispatch: Dispatch<IloadListUser>) => {
        if (!currentList) {
            dispatch({
                type: LOAD_CURRENT_LIST_USER,
                payload: undefined,
            });
        } else {
            let foundUser = findUserInGroup(currentList, userId);

            dispatch({
                type: LOAD_CURRENT_LIST_USER,
                payload: foundUser,
            });
        }
    };
