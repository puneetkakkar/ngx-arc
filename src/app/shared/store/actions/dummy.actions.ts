import { Action } from '@ngrx/store';

export enum DummyActionTypes {
	LoadDummyData = '[Dummy] Dummy Data Load',
	DummyDataSuccess = '[Dummy] Dummy Data Success',
	DummyDataFail = '[Dummy] Dummy Data Fail',
}

export class LoadDummyData implements Action {
	readonly type = DummyActionTypes.LoadDummyData;
}

export class DummyDataSuccess implements Action {
	readonly type = DummyActionTypes.DummyDataSuccess;

	constructor(public payload: object) {}
}

export class DummyDataFail implements Action {
	readonly type = DummyActionTypes.DummyDataFail;

	constructor(public payload: object = {}) {}
}

export type DummyActions = LoadDummyData | DummyDataSuccess | DummyDataFail;
