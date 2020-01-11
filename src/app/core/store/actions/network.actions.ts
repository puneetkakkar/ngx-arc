import { createAction } from '@ngrx/store';
import { NetworkActionTypes } from '../constants/network.constants';

export const startOnlineOfflineCheck = createAction(NetworkActionTypes.StartOnlineOfflineCheck);

export const setIsOnline = createAction(NetworkActionTypes.SetIsOnline, (payload: boolean) => ({
  payload,
}));
