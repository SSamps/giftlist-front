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

export type TloadUserActionCreator = () => void;

export const loadUserActionCreator = async (dispatch: Dispatch<IloadUserAction>) => {
    try {
        const res = await axios.get('/api/auth');

        console.log('loaded user with response: ' + res.data);
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export type TregisterActionCreator = (
    displayName: string,
    email: string,
    password: string
) => AxiosPromise<Error | AxiosError>;
export interface IregisterUserAction {
    type: typeof REGISTER_SUCCESS | typeof REGISTER_FAIL;
    payload?: { token: string };
}

export const registerActionCreator =
    (displayName: string, email: string, password: string) => async (dispatch: Dispatch<IregisterUserAction>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ displayName, email, password });

        try {
            const res = await axios.post('/api/users', body, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            loadUserActionCreator(store.dispatch);
        } catch (err) {
            dispatch({ type: REGISTER_FAIL });
            return err;
        }
    };

export type TloginActionCreator = (email: string, password: string) => AxiosPromise<Error | AxiosError>;
export interface IloginUserAction {
    type: typeof LOGIN_SUCCESS | typeof LOGIN_FAIL;
    payload?: { token: string };
}

export const loginActionCreator = (email: string, password: string) => async (dispatch: Dispatch<IloginUserAction>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        loadUserActionCreator(store.dispatch);
    } catch (err) {
        dispatch({ type: LOGIN_FAIL });
        return err;
    }
};

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
