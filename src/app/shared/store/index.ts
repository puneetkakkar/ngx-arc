import {
	ActionReducerMap,
	MetaReducer,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromNetwork from './reducers/network.reducer';

export interface AppState {
	network: fromNetwork.NetworkState;
}

export const reducers: ActionReducerMap<AppState> = {
	network: fromNetwork.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
	? []
	: [];

/**
 * Network Store Functions
 */

export const getNetworkState = createFeatureSelector<fromNetwork.NetworkState>(
	'network'
);
export const getIsOnline = createSelector(
	getNetworkState,
	fromNetwork.getIsOnline
);
