import { combineReducers } from 'redux';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import listGroupReducer, { IlistGroupData } from '../listGroupReducer';
import pendingInviteReducer, { IpendingInviteState } from '../pendingInviteReducer';

export interface IrootState {
    authReducer: IauthState;
    pendingInviteReducer: IpendingInviteState;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupData;
    pendingInviteReducer: IpendingInviteState;
}

export default combineReducers({
    authReducer,
    dashboardReducer,
    listGroupReducer,
    pendingInviteReducer,
});
