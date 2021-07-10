import { CURRENT_LIST_GET, PARENT_LIST_GET, LIST_ERROR, DELETE_LIST_ITEM } from './actionTypes';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { TListGroupAnyFields } from '../../types/models/listGroups';
import { LIST_GROUP_PARENT_VARIANTS } from '../../types/listVariants';

// Common
interface IlistActionError {
    type: typeof LIST_ERROR;
    payload?: { msg: string; status: string };
}

// Get Test Data
// TODO check the fields on the payloads

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
            dispatch({ type: LIST_ERROR, payload: { msg: err.response.data, status: err.response.status } });
        }
    };

interface IdeleteListItemActionSuccess {
    type: typeof DELETE_LIST_ITEM;
    payload?: TListGroupAnyFields;
}

export type TdeleteListItemActionCreator = (listId: string, listItemId: string) => void;

export const deleteListItemActionCreator =
    (listId: string, listItemId: string) =>
    async (dispatch: Dispatch<IdeleteListItemActionSuccess | IlistActionError>) => {
        try {
            let res = await axios.delete(`/api/groups/${listId}/items/${listItemId}`);
            dispatch({
                type: DELETE_LIST_ITEM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: LIST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
        }
    };

// interface IaddTestDataActionSuccess {
//     type: typeof TEST_DATA_ADD;
// }

// export type TaddTestDataActionCreator = (userId: string, testVar: string) => void;

// // Add Test Data
// export const addTestDataActionCreator =
//     (userId: string, testVar: string) =>
//     async (dispatch: Dispatch<IaddTestDataActionSuccess | ITestDataActionError>) => {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };

//         const body = JSON.stringify({ testVar });

//         try {
//             const res = await axios.post(`/api/test/${userId}`, body, config);
//             dispatch({
//                 type: TEST_DATA_ADD,
//                 payload: res.data,
//             });
//         } catch (err) {
//             dispatch({ type: TEST_DATA_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
//         }
//     };
