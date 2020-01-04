import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Device, DEVICE } from '@ngx-toolkit/device';
import { Sandbox } from './sandbox/base.sandbox';
import * as store from './store/index';

@Injectable()
export class SharedSandbox extends Sandbox {
  constructor(
    protected appState$: Store<store.AppState>,
    @Inject(DEVICE) private deviceDetector: Device,
  ) {
    super(appState$, deviceDetector);
  }
}
