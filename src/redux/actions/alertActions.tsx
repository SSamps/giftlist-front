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

export const addAlertActionCreator = (type: string, message: string, timeout = 4000) => {
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
