import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../reducers/root/reducerStore';
import { ADD_ALERT, REMOVE_ALERT } from './actionTypes';

const dispatch = store.dispatch;

export interface IaddAlertAction {
    type: typeof ADD_ALERT;
    payload: { type: string; message: string; id: string };
}

export interface IremoveAlertAction {
    type: typeof REMOVE_ALERT;
    payload: string;
}

export const addAlertActionCreator = (type: 'error', message: string, timeout = 40000) => {
    if (type === 'error') {
        message = shortenError(message);
    }
    const id = uuidv4();
    dispatch({
        type: ADD_ALERT,
        payload: { type, message, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const removeAlertActionCreator = (id: string) => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id,
    });
};

export type TaddAlertThunkActionCreator = (type: 'error', message: string, timeout?: number) => Promise<void>;

export const addAlertThunkActionCreator =
    (type: string, message: string, timeout = 4000) =>
    async (dispatch: Dispatch<IaddAlertAction | IremoveAlertAction>) => {
        if (type === 'error') {
            message = shortenError(message);
        }

        const id = uuidv4();
        dispatch({
            type: ADD_ALERT,
            payload: { type, message, id },
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    };

export const removeAlertThunkActionCreator = (id: string) => async (dispatch: Dispatch<IremoveAlertAction>) => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id,
    });
};

const shortenError = (error: string) => {
    if (error.startsWith('500 Proxy error: Could not proxy request')) {
        return '500 Proxy Error: Could not proxy request';
    }

    return error;
};
