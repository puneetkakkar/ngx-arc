import { NetworkState } from '../reducers/network.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const isOnline = (state: NetworkState) => state.isOnline;

export const getNetworkState = createFeatureSelector<NetworkState>('network');
export const getIsOnline = createSelector(getNetworkState, isOnline);
