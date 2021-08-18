import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { ADD_ALERT, REMOVE_ALERT } from './actionTypes';

interface IaddAlertAction {
    type: typeof ADD_ALERT;
    payload: { type: string; message: string; id: string };
}

interface IremoveAlertAction {
    type: typeof REMOVE_ALERT;
    payload: string;
}

export const addAlertActionCreator =
    (type: string, message: string, timeout = 4000) =>
    async (dispatch: Dispatch<IaddAlertAction | IremoveAlertAction>) => {
        const id = uuidv4();
        dispatch({
            type: ADD_ALERT,
            payload: { type, message, id },
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    };

export const removeAlertActionCreator = (id: string) => async (dispatch: Dispatch<IremoveAlertAction>) => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id,
    });
};
