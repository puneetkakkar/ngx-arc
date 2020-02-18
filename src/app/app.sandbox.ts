import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Device, DEVICE } from '@ngx-toolkit/device';
import { BaseSandbox } from './core/sandbox/base.sandbox';
import * as store from './core/store';
import { loadDummyData } from './core/store/actions/dummy.actions';
import { startOnlineOfflineCheck } from './core/store/actions/network.actions';
import { dummyEmployees, getIsOnline } from './core/store/selectors';

@Injectable()
export class AppSandbox extends BaseSandbox {
  public isOnline$ = this.appState$.select(getIsOnline);
  public dummyEmployees$ = this.appState$.select(dummyEmployees);

  constructor(protected appState$: Store<store.AppState>, @Inject(DEVICE) private deviceDetector: Device) {
    super(appState$, deviceDetector);
  }

  /**
   * Get offline/online status
   */
  getConnectionStatus() {
    this.appState$.dispatch(startOnlineOfflineCheck());
  }

  getDummyData() {
    this.appState$.dispatch(loadDummyData());
  }
}
