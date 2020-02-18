import { Action, createReducer, on } from '@ngrx/store';
import { dummyDataFail, dummyDataSuccess, loadDummyData } from '../actions/dummy.actions';

export interface DummyState {
  dummyEmployees: {
    loading: boolean;
    data: object;
    error: object;
  };
}

const initialState: DummyState = {
  dummyEmployees: {
    loading: false,
    data: undefined,
    error: undefined,
  },
};

const loadDummyDataReducerMap = (state: DummyState) => ({
  ...state,
  dummyEmployees: {
    ...state.dummyEmployees,
    loading: true,
  },
});

const handleDummyDataSuccess = (state: DummyState, payload: object): DummyState => ({
  ...state,
  dummyEmployees: {
    ...state.dummyEmployees,
    loading: false,
    data: payload,
  },
});

const dummyDataSuccessReducerMap = (state: DummyState, { payload }) => handleDummyDataSuccess(state, payload);

const dummyDataFailReducerMap = (state: DummyState, { payload }) => ({
  ...state,
  dummyEmployees: {
    ...state.dummyEmployees,
    loading: false,
    error: payload,
  },
});

const dummyReducerMap = createReducer(
  initialState,
  on(loadDummyData, loadDummyDataReducerMap),
  on(dummyDataSuccess, dummyDataSuccessReducerMap),
  on(dummyDataFail, dummyDataFailReducerMap),
);

export function dummyReducer(state: DummyState, action: Action) {
  return dummyReducerMap(state, action);
}
