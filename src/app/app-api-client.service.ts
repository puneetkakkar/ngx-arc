import { Injectable } from '@angular/core';
import { DefaultHeaders, HttpService } from './shared/async-services/http';

@Injectable()
@DefaultHeaders({
	Accept: 'application/json',
	'Content-Type': 'application/json',
})
export class AppApiClientService extends HttpService {}
