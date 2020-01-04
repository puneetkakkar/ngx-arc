import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';
import { AppApiClientService } from 'src/app/app-api-client.service';
import { setIsOnline, startOnlineOfflineCheck } from '../actions/network.actions';

@Injectable()
export class NetworkEffects {
  constructor(private actions$: Actions, public appApiClient: AppApiClientService) {}

  StartOnlineOfflineCheck$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(startOnlineOfflineCheck),
      concatMap(() => {
        return merge(
          of(navigator.onLine),
          fromEvent(window, 'online').pipe(mapTo(true)),
          fromEvent(window, 'offline').pipe(mapTo(false)),
        );
      }),
      map(isOnline => setIsOnline(isOnline)),
    ),
  );
}
