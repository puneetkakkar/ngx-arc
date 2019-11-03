import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromEvent, Observable, of, merge } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';
import { AppApiClientService } from 'src/app/app-api-client.service';
import * as networkActions from '../actions/network.actions';

@Injectable()
export class NetworkEffects {
	constructor(
		private actions$: Actions,
		public appApiClient: AppApiClientService
	) {}

	@Effect()
	StartOnlineOfflineCheck$: Observable<Action> = this.actions$.pipe(
		ofType(networkActions.NetworkActionTypes.StartOnlineOfflineCheck),
		concatMap(() => {
			return merge(
				of(navigator.onLine),
				fromEvent(window, 'online').pipe(mapTo(true)),
				fromEvent(window, 'offline').pipe(mapTo(false))
			);
		}),
		map(isOnline => {
			return new networkActions.SetIsOnline(isOnline);
		})
	);
}
