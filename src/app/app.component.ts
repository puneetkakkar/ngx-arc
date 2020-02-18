import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppSandbox } from './app.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean>;

  $isOnline: Observable<boolean>;
  $dummyEmployees: Observable<object>;

  title = 'ng-boilerplate';

  constructor(private appSandbox: AppSandbox) {
    this.destroy$ = new Subject();
    this.$isOnline = this.appSandbox.isOnline$;
    this.$dummyEmployees = this.appSandbox.dummyEmployees$;
  }

  ngOnInit() {
    this.appSandbox.getConnectionStatus();

    this.appSandbox.getDummyData();

    this.$dummyEmployees.pipe(filter(employees => typeof employees !== 'undefined')).subscribe(employees => {
      console.log('component', employees);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
