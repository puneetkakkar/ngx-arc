import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { NetworkState, DummyState, networkReducer, dummyReducer } from './reducers';

export interface AppState {
  network: NetworkState;
  dummy: DummyState;
}

export const reducers: ActionReducerMap<AppState> = {
  network: networkReducer,
  dummy: dummyReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
