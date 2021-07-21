import { combineReducers } from 'redux';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import testDataReducer, { ItestDataState } from '../testDataReducer';
import listGroupReducer, { IlistGroupData } from '../listGroupReducer';
import inviteReducer, { IinviteState } from '../inviteReducer';

export interface IrootState {
    authReducer: IauthState;
    inviteReducer: IinviteState;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    testDataReducer: ItestDataState;
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupData;
    inviteReducer: IinviteState;
}

export default combineReducers({ authReducer, testDataReducer, dashboardReducer, listGroupReducer, inviteReducer });
