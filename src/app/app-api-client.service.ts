import { Injectable } from '@angular/core';
import { AppAdapter } from './app.adapter';
import { Adapter, DefaultHeaders, GET, HttpService } from './shared/async-services/http';
import { of, Observable } from 'rxjs';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})
export class AppApiClientService extends HttpService {
  @GET('/employees')
  @Adapter(AppAdapter.dummyAdapter)
  public getDummyData(): Observable<never> {
    return of();
  }
}
