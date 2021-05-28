import { combineReducers } from 'redux';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import testDataReducer, { ItestDataState } from '../testDataReducer';

export interface IrootState {
    authReducer: IauthState;
    testDataReducer: ItestDataState;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    testDataReducer: ItestDataState;
}

export default combineReducers({ authReducer, testDataReducer });
