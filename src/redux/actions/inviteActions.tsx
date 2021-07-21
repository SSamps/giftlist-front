import { INVITE_ACCEPTED, INVITE_ERROR, INVITE_PENDING, INVITE_RESET_ERROR } from './actionTypes';
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

interface IinviteReset {
    type: typeof INVITE_RESET_ERROR;
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

export type TresetInviteActionCreator = () => void;

export const resetInviteActionCreator: TresetInviteActionCreator = () => async (dispatch: Dispatch<IinviteReset>) => {
    dispatch({
        type: INVITE_RESET_ERROR,
    });
};
