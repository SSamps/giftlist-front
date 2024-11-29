import { combineReducers } from 'redux';
import alertReducer, { TalertData } from '../alertReducer';
import dashboardReducer, { IdashboardState } from '../dashboardReducer';
import listGroupReducer, {
    IbasicListLoaded,
    IgiftGroupLoaded,
    IgiftListLoaded,
    IlistGroupData,
    IunknownListLoaded,
} from '../listGroupReducer';

export interface IrootState {
    alertReducer: TalertData;
}

export interface IrootStateAuthed {
    dashboardReducer: IdashboardState;
    listGroupReducer: IlistGroupData;
    alertReducer: TalertData;
}

export interface IrootStateAuthedUnknownListLoaded {
    dashboardReducer: IdashboardState;
    listGroupReducer: IunknownListLoaded;
    alertReducer: TalertData;
}

export interface IrootStateAuthedBasicListLoaded {
    dashboardReducer: IdashboardState;
    listGroupReducer: IbasicListLoaded;
    alertReducer: TalertData;
}

export interface IrootStateAuthedGiftListLoaded {
    dashboardReducer: IdashboardState;
    listGroupReducer: IgiftListLoaded;
    alertReducer: TalertData;
}

export interface IrootStateAuthedGiftGroupLoaded {
    dashboardReducer: IdashboardState;
    listGroupReducer: IgiftGroupLoaded;
    alertReducer: TalertData;
}

export default combineReducers({
    dashboardReducer,
    listGroupReducer,
    alertReducer,
});
