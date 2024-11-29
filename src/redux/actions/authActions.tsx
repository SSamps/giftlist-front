import axios, { AxiosError, AxiosPromise } from 'axios';
import { Dispatch } from 'redux';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_ACCOUNT,
    RENAME_USER,
} from './actionTypes';
import { IUser } from '../../types/models/User';
import store from '../reducers/root/reducerStore';
import { handleActionError } from '../../misc/helperFunctions';

export interface IloadUserAction {
    type: typeof USER_LOADED | typeof AUTH_ERROR;
    payload?: IUser;
}

export interface IlogoutAction {
    type: typeof LOGOUT;
}

export interface IlogoutAction {
    type: typeof LOGOUT;
}
export type TlogoutActionCreator = () => void;

export const logoutActionCreator = () => async (dispatch: Dispatch<IlogoutAction>) => {
    dispatch({ type: LOGOUT });
};

interface IrenameUserSuccess {
    type: typeof RENAME_USER;
}

export type TrenameUserActionCreator = (newName: string) => Promise<boolean>;

export const renameUserActionCreator = (newName: string) => async (dispatch: Dispatch<IrenameUserSuccess>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const reqBody = JSON.stringify({ displayName: newName });

    try {
        const res = await axios.put(`/api/users`, reqBody, config);

        dispatch({
            type: RENAME_USER,
            payload: res.data,
        });
        return true;
    } catch (err) {
        handleActionError(err);
        return false;
    }
};

interface IdeleteAccountSuccess {
    type: typeof DELETE_ACCOUNT;
}

export type TdeleteAccountActionCreator = () => Promise<boolean>;

export const deleteAccountActionCreator = () => async (dispatch: Dispatch<IdeleteAccountSuccess>) => {
    try {
        await axios.delete(`/api/users`);

        dispatch({
            type: DELETE_ACCOUNT,
        });
        return true;
    } catch (err) {
        handleActionError(err);
        return false;
    }
};
