import { combineReducers } from 'redux';
import authReducer, { IauthState, IauthStateAuthed } from '../authReducer';
import listGroupReducer, { IlistGroupState } from '../listGroupReducer';
import testDataReducer, { ItestDataState } from '../testDataReducer';

export interface IrootState {
    authReducer: IauthState;
    testDataReducer: ItestDataState;
    listGroupReducer: IlistGroupState;
}

export interface IrootStateAuthed {
    authReducer: IauthStateAuthed;
    testDataReducer: ItestDataState;
    listGroupReducer: IlistGroupState;
}

export default combineReducers({ authReducer, testDataReducer, listGroupReducer });
