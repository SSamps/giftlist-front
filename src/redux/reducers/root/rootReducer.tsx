import { combineReducers } from 'redux';
import alertReducer, { TalertData } from '../alertReducer';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import listGroupReducer, {
    IbasicListLoaded,
    IgiftGroupLoaded,
    IgiftListLoaded,
    IlistGroupData,
    IunknownListLoaded,
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

export interface IrootStateAuthedUnknownListLoaded {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IunknownListLoaded;
    alertReducer: TalertData;
}

export interface IrootStateAuthedBasicListLoaded {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IbasicListLoaded;
    alertReducer: TalertData;
}

export interface IrootStateAuthedGiftListLoaded {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IgiftListLoaded;
    alertReducer: TalertData;
}

export interface IrootStateAuthedGiftGroupLoaded {
    authReducer: IauthStateAuthed;
    dashboardReducer: IdashboardState;
    listGroupReducer: IgiftGroupLoaded;
    alertReducer: TalertData;
}

export default combineReducers({
    authReducer,
    dashboardReducer,
    listGroupReducer,
    alertReducer,
});
