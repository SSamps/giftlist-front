import {
    CURRENT_LIST_GET,
    PARENT_LIST_GET,
    LIST_ERROR,
    DELETE_LIST_ITEM,
    LIST_RESET,
    NEW_LIST_ITEM,
    MODIFY_LIST_ITEM,
    SELECT_LIST_ITEM,
    DELETE_LIST,
    RENAME_LIST,
    LEAVE_LIST,
    LOAD_LIST_PERMISSIONS,
} from './actionTypes';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { TListGroupAnyFields } from '../../types/models/listGroups';
import { LIST_GROUP_PARENT_VARIANTS } from '../../types/listVariants';
import { findUserInGroup } from '../../utils/helperFunctions';

interface IlistActionError {
    type: typeof LIST_ERROR;
    payload?: { data: string; status: string };
}

interface IgetListActionSuccess {
    type: typeof CURRENT_LIST_GET;
    payload?: TListGroupAnyFields;
}

interface IgetParentListActionSuccess {
    type: typeof PARENT_LIST_GET;
    payload?: TListGroupAnyFields;
}

export type TgetListActionCreator = (id: string) => void;

export const getListActionCreator =
    (listId: string) =>
    async (dispatch: Dispatch<IgetListActionSuccess | IgetParentListActionSuccess | IlistActionError>) => {
        try {
            const res: AxiosResponse<TListGroupAnyFields> = await axios.get(`/api/groups/${listId}`);
            if (LIST_GROUP_PARENT_VARIANTS.includes(res.data.groupVariant)) {
                dispatch({
                    type: PARENT_LIST_GET,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: CURRENT_LIST_GET,
                    payload: res.data,
                });
            }
        } catch (err) {
            dispatch({ type: LIST_ERROR, payload: { data: err.response.data, status: err.response.status } });
        }
    };

interface IdeleteListItemActionSuccess {
    type: typeof DELETE_LIST_ITEM;
    payload?: TListGroupAnyFields;
}

export type TdeleteListItemActionCreator = (listId: string, listItemIds: string[]) => void;

export const deleteListItemActionCreator =
    (listId: string, listItemIds: string[]) =>
    async (dispatch: Dispatch<IdeleteListItemActionSuccess | IlistActionError>) => {
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
        } catch (err) {
            dispatch({ type: LIST_ERROR, payload: { data: err.response.data, status: err.response.status } });
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
) => void;

export const newListItemActionCreator =
    (body: string, links: string[], itemType: 'listItem' | 'secretListItem', groupId: string) =>
    async (dispatch: Dispatch<InewListItemActionSuccess | IlistActionError>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const reqBody = JSON.stringify({ [itemType]: { body, links } });

        try {
            const res = await axios.post(`/api/groups/${groupId}/items`, reqBody, config);

            dispatch({
                type: NEW_LIST_ITEM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: LIST_ERROR, payload: { data: err.response.data, status: err.response.status } });
        }
    };

interface ImodifyListItemActionSuccess {
    type: typeof MODIFY_LIST_ITEM;
}

export type TmodifyListItemActionCreator = (body: string, links: string[], itemId: string, groupId: string) => void;

export const modifyListItemActionCreator: TmodifyListItemActionCreator =
    (body, links, itemId, groupId) => async (dispatch: Dispatch<ImodifyListItemActionSuccess | IlistActionError>) => {
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
        } catch (err) {
            console.error(err);
            dispatch({ type: LIST_ERROR, payload: { data: err.response.data, status: err.response.status } });
        }
    };

interface IselectListItemActionSuccess {
    type: typeof SELECT_LIST_ITEM;
}

export type TselectListItemActionCreator = (action: 'SELECT' | 'DESELECT', itemId: string, groupId: string) => void;

export const selectListItemActionCreator: TselectListItemActionCreator =
    (action, itemId, groupId) => async (dispatch: Dispatch<IselectListItemActionSuccess | IlistActionError>) => {
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
            console.log({ ...err });
            dispatch({ type: LIST_ERROR, payload: { data: err.response.data, status: err.response.status } });
        }
    };

interface IdeleteListSuccess {
    type: typeof DELETE_LIST;
}

export type TdeleteListActionCreator = (groupId: string) => void;

export const deleteListActionCreator: TdeleteListActionCreator =
    (groupId) => async (dispatch: Dispatch<IdeleteListSuccess | IlistActionError>) => {
        try {
            await axios.delete(`/api/groups/${groupId}/delete`);

            dispatch({
                type: DELETE_LIST,
            });
        } catch (err) {
            dispatch({ type: LIST_ERROR, payload: { data: err.response.data, status: err.response.status } });
        }
    };

interface IrenameListSuccess {
    type: typeof RENAME_LIST;
}

export type TrenameListActionCreator = (groupId: string, newName: string) => void;

export const renameListActionCreator: TrenameListActionCreator =
    (groupId, newName) => async (dispatch: Dispatch<IrenameListSuccess | IlistActionError>) => {
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
        } catch (err) {
            dispatch({ type: LIST_ERROR, payload: { data: err.response.data, status: err.response.status } });
        }
    };

interface IleaveListSuccess {
    type: typeof LEAVE_LIST;
}

export type TleaveListActionCreator = (groupId: string) => void;

export const leaveListActionCreator: TleaveListActionCreator =
    (groupId) => async (dispatch: Dispatch<IleaveListSuccess | IlistActionError>) => {
        try {
            const res = await axios.put(`/api/groups/${groupId}/leave`);

            dispatch({
                type: LEAVE_LIST,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: LIST_ERROR, payload: { data: err.response.data, status: err.response.status } });
        }
    };

interface IloadListPermissions {
    type: typeof LOAD_LIST_PERMISSIONS;
}

export type TloadListPermissionsActionCreator = (currentList: TListGroupAnyFields | undefined, userId: string) => void;

export const loadListPermissionsActionCreator: TloadListPermissionsActionCreator =
    (currentList, userId) => async (dispatch: Dispatch<IloadListPermissions | IlistActionError>) => {
        if (!currentList) {
            dispatch({
                type: LOAD_LIST_PERMISSIONS,
                payload: undefined,
            });
        } else {
            let foundUser = findUserInGroup(currentList, userId);

            dispatch({
                type: LOAD_LIST_PERMISSIONS,
                payload: foundUser?.permissions,
            });
        }
    };
