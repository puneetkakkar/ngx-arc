import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Device, DEVICE } from '@ngx-toolkit/device';
import { Sandbox } from './shared/sandbox/base.sandbox';
import * as store from './shared/store';
import { startOnlineOfflineCheck } from './shared/store/actions/network.actions';
import { loadDummyData } from './shared/store/actions/dummy.actions';
import { getIsOnline, dummyEmployees } from './shared/store/selectors';

@Injectable()
export class AppSandbox extends Sandbox {
  public isOnline$ = this.appState$.select(getIsOnline);
  public dummyEmployees$ = this.appState$.select(dummyEmployees);

  constructor(
    protected appState$: Store<store.AppState>,
    @Inject(DEVICE) private deviceDetector: Device,
  ) {
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
