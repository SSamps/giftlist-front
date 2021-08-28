import { combineReducers } from 'redux';
import alertReducer, { TalertData } from '../alertReducer';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import listGroupReducer, {
    IlistGroupData,
    IlistGroupDataCurrentListLoaded,
    IlistGroupDataParentListLoaded,
} from '../listGroupReducer';

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

export interface IrootStateAuthedParentListLoaded {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupDataParentListLoaded;
    alertReducer: TalertData;
}

export default combineReducers({
    authReducer,
    dashboardReducer,
    listGroupReducer,
    alertReducer,
});
