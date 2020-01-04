import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { AppApiClientService } from 'src/app/app-api-client.service';
import { dummyDataFail, dummyDataSuccess, loadDummyData } from '../actions/dummy.actions';

@Injectable()
export class DummyEffects {
  constructor(private actions$: Actions, public appApiClient: AppApiClientService) {}

  getDummyData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDummyData),
      switchMap(state => {
        return this.appApiClient.getDummyData().pipe(
          filter(response => typeof response !== 'undefined'),
          map(response => dummyDataSuccess(response)),
          catchError(error => of(dummyDataFail())),
        );
      }),
    ),
  );
}
