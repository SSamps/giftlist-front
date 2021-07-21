import { combineReducers } from 'redux';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import testDataReducer, { ItestDataState } from '../testDataReducer';
import listGroupReducer, { IlistGroupData } from '../listGroupReducer';
import pendingInviteReducer, { IpendingInviteState } from '../pendingInviteReducer';

export interface IrootState {
    authReducer: IauthState;
    pendingInviteReducer: IpendingInviteState;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    testDataReducer: ItestDataState;
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupData;
    pendingInviteReducer: IpendingInviteState;
}

export default combineReducers({
    authReducer,
    testDataReducer,
    dashboardReducer,
    listGroupReducer,
    pendingInviteReducer,
});
