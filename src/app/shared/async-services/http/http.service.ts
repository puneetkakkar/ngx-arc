import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AppSandbox } from '../../../app.sandbox';
import { HttpResponseHandlerService } from './http-response-handler.service';
import { HttpAdapter } from './http.adapter';

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
  FORM_DATA,
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    protected http: HttpClient,
    protected responseHandler: HttpResponseHandlerService,
    protected appSandbox: AppSandbox,
  ) {}

  protected getBaseUrl(): string {
    return environment.api.baseUrl;
  }

  protected getDefaultHeaders(): object {
    return {};
  }

  /**
   * Request Interceptor
   *
   * @method requestInterceptor
   * @param Request req - request object
   */
  protected requestInterceptor(req: HttpRequest<any>): HttpRequest<any> {
    req = req.clone({
      headers: req.headers.set('x-device-type', this.appSandbox.getDeviceType()),
    });

    return req;
  }

  /**
   * Response Interceptor
   *
   * @method responseInterceptor
   * @param Response observableRes - response object
   * @returns Response res - transformed response object
   */
  protected responseInterceptor(
    observableRes: Observable<HttpResponse<object>>,
    adapterFn?: () => void,
  ): Observable<HttpResponse<object>> {
    return observableRes.pipe(
      map((res: HttpResponse<object>) => {
        return HttpAdapter.baseAdapter(res, adapterFn, this.appSandbox.getDeviceType());
      }),
      catchError((err, source: Observable<HttpRequest<string>>) => {
        return this.responseHandler.onCatch(err, source);
      }),
    );
  }
}
