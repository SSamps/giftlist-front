import { combineReducers } from 'redux';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import testDataReducer, { ItestDataState } from '../testDataReducer';
import listGroupReducer, { IlistGroupData } from '../listGroupReducer';

export interface IrootState {
    authReducer: IauthState;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    testDataReducer: ItestDataState;
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupData;
}

export default combineReducers({ authReducer, testDataReducer, dashboardReducer, listGroupReducer });
