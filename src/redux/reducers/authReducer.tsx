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
} from '../actions/actionTypes';
import { IUser } from '../../types/models/User';
import { AnyAction } from 'redux';

export interface IauthStateAuthed {
    token: string;
    isAuthenticated: boolean;
    loading: boolean;
    user: IUser;
}

export interface IauthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    user: IUser | null;
}

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
};

export default function reducer(state: IauthState = initialState, action: AnyAction): IauthState {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case RENAME_USER:
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false,
            };
        case DELETE_ACCOUNT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return {
                ...state,
            };
    }
}
