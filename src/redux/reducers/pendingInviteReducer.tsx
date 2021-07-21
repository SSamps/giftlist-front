import {
    INVITE_ACCEPTED,
    INVITE_CLEAR,
    INVITE_CONVERT_TOKEN_ERROR,
    INVITE_ERROR,
    INVITE_PENDING,
    INVITE_RESET_ERROR,
    INVITE_TOKEN_ERROR,
} from '../actions/actionTypes';
import { AnyAction } from 'redux';

export interface IpendingInviteState {
    invitePending: undefined | { inviteToken: string; groupName: string };
    inviteError: undefined | string;
    inviteTokenError: undefined | string;
    inviteAccepted: undefined | string;
}

const initialState: IpendingInviteState = {
    invitePending: undefined,
    inviteError: undefined,
    inviteTokenError: undefined,
    inviteAccepted: undefined,
};

export default function reducer(state: IpendingInviteState = initialState, action: AnyAction): IpendingInviteState {
    const { type, payload } = action;

    switch (type) {
        case INVITE_PENDING:
            return {
                invitePending: payload,
                inviteError: undefined,
                inviteAccepted: undefined,
                inviteTokenError: undefined,
            };
        case INVITE_ACCEPTED:
            return {
                invitePending: undefined,
                inviteError: undefined,
                inviteAccepted: payload,
                inviteTokenError: undefined,
            };
        case INVITE_ERROR:
            return {
                invitePending: undefined,
                inviteError: payload,
                inviteAccepted: undefined,
                inviteTokenError: undefined,
            };
        case INVITE_RESET_ERROR:
            return {
                ...state,
                inviteError: undefined,
            };
        case INVITE_TOKEN_ERROR:
            return {
                invitePending: undefined,
                inviteError: undefined,
                inviteAccepted: undefined,
                inviteTokenError: payload,
            };
        case INVITE_CONVERT_TOKEN_ERROR:
            return {
                ...state,
                inviteError: state.inviteTokenError,
                inviteTokenError: undefined,
            };
        case INVITE_CLEAR:
            return {
                ...initialState,
            };
        default:
            return {
                ...state,
            };
    }
}
