import { Action, createReducer, on } from '@ngrx/store';
import { setIsOnline } from '../actions/network.actions';

export interface NetworkState {
  isOnline: boolean;
}

const initialState: NetworkState = {
  isOnline: false,
};

const handleIsOnline = (state: NetworkState, payload: boolean): NetworkState => ({
  ...state,
  isOnline: payload,
});

const setIsOnlineReducerMap = (state: NetworkState, { payload }) => handleIsOnline(state, payload);

const networkReducerMap = createReducer(initialState, on(setIsOnline, setIsOnlineReducerMap));

export function networkReducer(state: NetworkState, action: Action) {
  return networkReducerMap(state, action);
}
