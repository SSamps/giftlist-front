import { combineReducers } from 'redux';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import testDataReducer, { ItestDataState } from '../testDataReducer';

export interface IrootState {
    authReducer: IauthState;
    testDataReducer: ItestDataState;
    dashboardReducer: IdashboardState;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    testDataReducer: ItestDataState;
    dashboardReducer: IdashboardState;
}

export default combineReducers({ authReducer, testDataReducer, dashboardReducer });
