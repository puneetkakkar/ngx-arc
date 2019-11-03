import {
	ActionReducerMap,
	MetaReducer,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromNetwork from './reducers/network.reducer';
import * as fromDummy from './reducers/dummy.reducer';

export interface AppState {
	network: fromNetwork.NetworkState;
	dummy: fromDummy.DummyState;
}

export const reducers: ActionReducerMap<AppState> = {
	network: fromNetwork.reducer,
	dummy: fromDummy.reducer,
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

/**
 * Dummmy Employees Function
 */

export const getDummyState = createFeatureSelector<fromDummy.DummyState>(
	'dummy'
);
export const dummyEmployees = createSelector(
	getDummyState,
	fromDummy.dummyEmployeesSuccess
);
