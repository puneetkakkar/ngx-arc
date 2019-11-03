import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Device, DEVICE } from '@ngx-toolkit/device';
import { Sandbox } from './shared/sandbox/base.sandbox';
import * as store from './shared/store';
import { StartOnlineOfflineCheck } from './shared/store/actions/network.actions';
import * as fromRoot from './shared/store/index';
import { LoadDummyData } from './shared/store/actions/dummy.actions';

@Injectable()
export class AppSandbox extends Sandbox {
	public isOnline$ = this.appState$.select(fromRoot.getIsOnline);
	public dummyEmployees$ = this.appState$.select(fromRoot.dummyEmployees);

	constructor(
		protected appState$: Store<store.AppState>,
		@Inject(DEVICE) private deviceDetector: Device
	) {
		super(appState$, deviceDetector);
	}

	/**
	 * Get offline/online status
	 */
	getConnectionStatus() {
		this.appState$.dispatch(new StartOnlineOfflineCheck());
	}

	getDummyData() {
		this.appState$.dispatch(new LoadDummyData());
	}
}
