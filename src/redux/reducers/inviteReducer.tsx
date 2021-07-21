import { INVITE_ACCEPTED, INVITE_ERROR, INVITE_PENDING, INVITE_RESET_ERROR } from '../actions/actionTypes';
import { AnyAction } from 'redux';

export interface IinviteState {
    invitePending: undefined | { inviteToken: string; groupName: string };
    inviteError: undefined | string;
    inviteAccepted: undefined | string;
}

const initialState: IinviteState = {
    invitePending: undefined,
    inviteError: undefined,
    inviteAccepted: undefined,
};

export default function reducer(state: IinviteState = initialState, action: AnyAction): IinviteState {
    const { type, payload } = action;

    switch (type) {
        case INVITE_PENDING:
            return {
                invitePending: payload,
                inviteError: undefined,
                inviteAccepted: undefined,
            };
        case INVITE_ACCEPTED:
            return {
                invitePending: undefined,
                inviteError: undefined,
                inviteAccepted: payload,
            };
        case INVITE_ERROR:
            return {
                invitePending: undefined,
                inviteError: payload,
                inviteAccepted: undefined,
            };
        case INVITE_RESET_ERROR:
            return {
                ...state,
                inviteError: undefined,
            };
        default:
            return {
                ...state,
            };
    }
}
