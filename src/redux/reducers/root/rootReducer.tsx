import { combineReducers } from 'redux';
import alertReducer, { TalertData } from '../alertReducer';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import listGroupReducer, { IlistGroupData, IlistGroupDataCurrentListLoaded } from '../listGroupReducer';

export interface IrootState {
    authReducer: IauthState;
    alertReducer: TalertData;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupData;
    alertReducer: TalertData;
}

export interface IrootStateAuthedCurrentListLoaded {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupDataCurrentListLoaded;
    alertReducer: TalertData;
}

export default combineReducers({
    authReducer,
    dashboardReducer,
    listGroupReducer,
    alertReducer,
});
