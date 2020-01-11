import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Device, DEVICE } from '@ngx-toolkit/device';
import { BaseSandbox } from '../core/sandbox/base.sandbox';
import * as store from '../core/store';

@Injectable()
export class SharedSandbox extends BaseSandbox {
  constructor(
    protected appState$: Store<store.AppState>,
    @Inject(DEVICE) private deviceDetector: Device,
  ) {
    super(appState$, deviceDetector);
  }
}
