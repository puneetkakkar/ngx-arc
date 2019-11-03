import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { AppApiClientService } from 'src/app/app-api-client.service';
import * as dummyActions from '../actions/dummy.actions';

@Injectable()
export class DummyEffects {
	constructor(
		private actions$: Actions,
		public appApiClient: AppApiClientService
	) {}

	@Effect()
	getDummyData$: Observable<Action> = this.actions$.pipe(
		ofType(dummyActions.DummyActionTypes.LoadDummyData),
		switchMap(state => {
			return this.appApiClient.getDummyData().pipe(
				filter(response => typeof response !== 'undefined'),
				map(response => {
					return new dummyActions.DummyDataSuccess(response);
				}),
				catchError(error => of(new dummyActions.DummyDataFail()))
			);
		})
	);
}
