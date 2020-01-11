import { DummyState } from '../reducers/dummy.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const dummyEmployeesSuccess = (state: DummyState) => state.dummyEmployees.data;

export const dummyEmployeesFailed = (state: DummyState) => state.dummyEmployees.error;

export const getDummyState = createFeatureSelector<DummyState>('dummy');
export const dummyEmployees = createSelector(getDummyState, dummyEmployeesSuccess);
