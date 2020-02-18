import { createAction } from '@ngrx/store';
import { DummyActionTypes } from '../constants/dummy.contants';

export const loadDummyData = createAction(DummyActionTypes.LoadDummyData);

export const dummyDataSuccess = createAction(DummyActionTypes.DummyDataSuccess, (payload: object) => ({
  payload,
}));

export const dummyDataFail = createAction(DummyActionTypes.DummyDataFail, (payload: object = {}) => ({ payload }));
