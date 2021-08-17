import { combineReducers } from 'redux';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import listGroupReducer, { IlistGroupData } from '../listGroupReducer';

export interface IrootState {
    authReducer: IauthState;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupData;
}

export default combineReducers({
    authReducer,
    dashboardReducer,
    listGroupReducer,
});
