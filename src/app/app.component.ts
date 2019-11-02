import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSandbox } from './app.sandbox';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	destroy$: Subject<boolean>;

	$isOnline: Observable<boolean>;

	title = 'ng-boilerplate';

	constructor(private appSandbox: AppSandbox) {
		this.destroy$ = new Subject();
		this.$isOnline = this.appSandbox.isOnline$;
	}

	ngOnInit() {
		this.appSandbox.getConnectionStatus();
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
