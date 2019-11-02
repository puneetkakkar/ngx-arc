import { Injectable } from '@angular/core';
import { DefaultHeaders, HttpService } from './async-services/http';

@Injectable()
@DefaultHeaders({
	Accept: 'application/json',
	'Content-Type': 'application/json',
})
export class SharedApiClientService extends HttpService {}
