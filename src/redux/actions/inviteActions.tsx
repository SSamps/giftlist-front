import {
    INVITE_ACCEPTED,
    INVITE_CLEAR,
    INVITE_CONVERT_TOKEN_ERROR,
    INVITE_ERROR,
    INVITE_PENDING,
    INVITE_RESET_ERROR,
    INVITE_TOKEN_ERROR,
} from './actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

// Common
interface IinviteError {
    type: typeof INVITE_ERROR;
    payload: string;
}

interface IinviteAccepted {
    type: typeof INVITE_ACCEPTED;
    payload: string;
}

interface IinvitePending {
    type: typeof INVITE_PENDING;
    payload: { inviteToken: string; groupName: string };
}

interface IinviteErrorReset {
    type: typeof INVITE_RESET_ERROR;
}

interface IinviteTokenError {
    type: typeof INVITE_TOKEN_ERROR;
}

interface IinviteTokenErrorConvert {
    type: typeof INVITE_CONVERT_TOKEN_ERROR;
}

interface IinviteClear {
    type: typeof INVITE_CLEAR;
}

export type TsetPendingInviteActionCreator = (inviteToken: string, groupName: string) => void;

export const setPendingInviteActionCreator: TsetPendingInviteActionCreator =
    (inviteToken, groupName) => async (dispatch: Dispatch<IinvitePending>) => {
        dispatch({
            type: INVITE_PENDING,
            payload: { inviteToken: inviteToken, groupName: groupName },
        });
    };

export type TacceptInviteActionCreator = (inviteToken: string, groupName: string) => void;

export const acceptInviteActionCreator: TacceptInviteActionCreator =
    (inviteToken, groupName) => async (dispatch: Dispatch<IinviteAccepted | IinviteError>) => {
        try {
            const res = await axios.post(`/api/groups/invite/accept/${inviteToken}`);
            dispatch({
                type: INVITE_ACCEPTED,
                payload: res.data._id,
            });
        } catch (err) {
            console.error('Error: ' + err.response.status + ' ' + err.response.statusText);
            dispatch({
                type: INVITE_ERROR,
                payload: `We encountered an error accepting the invite to join ${groupName}`,
            });
        }
    };

export type TresetInviteErrorActionCreator = () => void;

export const resetInviteErrorActionCreator: TresetInviteErrorActionCreator =
    () => async (dispatch: Dispatch<IinviteErrorReset>) => {
        dispatch({
            type: INVITE_RESET_ERROR,
        });
    };

export type TInviteTokenErrorActionCreator = () => void;

export const inviteTokenErrorActionCreator: TInviteTokenErrorActionCreator =
    () => async (dispatch: Dispatch<IinviteTokenError>) => {
        dispatch({
            type: INVITE_TOKEN_ERROR,
            payload: 'Invalid group invite token',
        });
    };

export type TconvertInviteTokenErrorActionCreator = () => void;

export const convertInviteTokenErrorActionCreator: TconvertInviteTokenErrorActionCreator =
    () => async (dispatch: Dispatch<IinviteTokenErrorConvert>) => {
        dispatch({
            type: INVITE_CONVERT_TOKEN_ERROR,
        });
    };

export type TclearInviteActionCreator = () => void;

export const clearInviteActionCreator: TclearInviteActionCreator = () => async (dispatch: Dispatch<IinviteClear>) => {
    dispatch({
        type: INVITE_CLEAR,
    });
};
