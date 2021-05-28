import { TEST_DATA_GET, TEST_DATA_ERROR, TEST_DATA_DELETE, TEST_DATA_ADD } from '../actions/actionTypes';
import { Dispatch } from 'redux';
import axios, { AxiosError, AxiosPromise } from 'axios';

// Common
interface ITestDataActionError {
    type: typeof TEST_DATA_ERROR;
    payload?: { msg: string; status: string };
}

// Get Test Data
export type TregisterActionCreator = (
    displayName: string,
    email: string,
    password: string
) => AxiosPromise<Error | AxiosError>;

interface IgetTestDataActionSuccess {
    type: typeof TEST_DATA_GET;
    payload?: { token: string };
}

export type TgetTestDataActionCreator = (id: string) => void;

export const getTestDataActionCreator =
    (id: string) => async (dispatch: Dispatch<IgetTestDataActionSuccess | ITestDataActionError>) => {
        try {
            const res = await axios.get(`/api/test/${id}`);
            dispatch({
                type: TEST_DATA_GET,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: TEST_DATA_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
        }
    };

// Delete Test Data

interface IdeleteTestDataActionSuccess {
    type: typeof TEST_DATA_DELETE;
    payload?: string;
}

export type TdeleteTestDataActionCreator = (userId: string, elementId: string) => void;

export const deleteTestDataActionCreator =
    (userId: string, elementId: string) =>
    async (dispatch: Dispatch<IdeleteTestDataActionSuccess | ITestDataActionError>) => {
        try {
            await axios.delete(`/api/test/${userId}/${elementId}`);
            dispatch({
                type: TEST_DATA_DELETE,
                payload: elementId,
            });
        } catch (err) {
            dispatch({ type: TEST_DATA_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
        }
    };

interface IaddTestDataActionSuccess {
    type: typeof TEST_DATA_ADD;
}

export type TaddTestDataActionCreator = (userId: string, testVar: string) => void;

// Add Test Data
export const addTestDataActionCreator =
    (userId: string, testVar: string) =>
    async (dispatch: Dispatch<IaddTestDataActionSuccess | ITestDataActionError>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ testVar });

        try {
            const res = await axios.post(`/api/test/${userId}`, body, config);
            dispatch({
                type: TEST_DATA_ADD,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: TEST_DATA_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
        }
    };
