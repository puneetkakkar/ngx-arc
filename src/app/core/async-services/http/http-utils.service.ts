import { HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export interface InitParams {
  headers?: HttpHeaders;
  reportProgress?: boolean;
  params?: HttpParams;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

function createBody(pBody: Array<any>, descriptor: any, args: Array<any>): string {
  if (descriptor.isFormData) {
    return args[0];
  }
  return pBody ? JSON.stringify(args[pBody[0].parameterIndex]) : '';
}

function createPath(url: string, pPath: Array<any>, args: Array<any>): string {
  let resUrl: string = url;

  if (pPath) {
    for (const k in pPath) {
      if (pPath.hasOwnProperty(k)) {
        resUrl = resUrl.replace('{' + pPath[k].key + '}', args[pPath[k].parameterIndex]);
      }
    }
  }

  return resUrl;
}

function createQuery(pQuery: any, args: Array<any>): HttpParams {
  let search = new HttpParams();
  const pQueryKey = typeof pQuery !== 'undefined' && pQuery !== '' ? pQuery[0].key : '';
  const query = typeof args !== 'undefined' && args !== [] ? args[0] : {};
  if (pQueryKey) {
    for (const key of Object.keys(query)) {
      const qKey = key;
      let qValue = query[key];
      // if the qValue is a instance of Object, we stringify it
      if (qValue instanceof Object) {
        qValue = JSON.stringify(qValue);
      }
      search = search.set(qKey, qValue);
    }
  }

  return search;
}

function createHeaders(pHeader: any, descriptor: any, defaultHeaders: any, args: Array<any>): HttpHeaders {
  let headers = new HttpHeaders(defaultHeaders);

  // set method specific headers
  for (const k in descriptor.headers) {
    if (descriptor.headers.hasOwnProperty(k)) {
      if (headers.has(k)) {
        headers.delete(k);
      }
      headers = headers.append(k, descriptor.headers[k]);
    }
  }

  // set parameter specific headers
  if (pHeader) {
    for (const k in pHeader) {
      if (pHeader.hasOwnProperty(k)) {
        if (headers.has(k)) {
          headers.delete(k);
        }
        headers = headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
      }
    }
  }

  return headers;
}

function createResponseType(pResponseType: any, descriptor: any, args: any): 'arraybuffer' | 'blob' | 'json' | 'text' {
  return typeof descriptor.responseType !== 'undefined' && descriptor.responseType !== ''
    ? descriptor.responseType.toString()
    : 'json';
}

export function methodBuilder(method: string) {
  return (url: string) => {
    return (target: HttpService, propertyKey: string, descriptor: any) => {
      const pPath = target[`${propertyKey}_Path_parameters`];
      const pQuery = target[`${propertyKey}_Query_parameters`];
      const pBody = target[`${propertyKey}_Body_parameters`];
      const pHeader = target[`${propertyKey}_Header_parameters`];
      const pResponseType = target[`${propertyKey}_ResponseType_parameters`];

      descriptor.value = function(...args: any[]) {
        const body: string = createBody(pBody, descriptor, args);
        const resUrl: string = createPath(url, pPath, args);
        const search: HttpParams = createQuery(pQuery, args);
        const headers: HttpHeaders = createHeaders(pHeader, descriptor, this.getDefaultHeaders(), args);
        const responseType: 'arraybuffer' | 'blob' | 'json' | 'text' = createResponseType(
          pResponseType,
          descriptor,
          args,
        );

        const init: InitParams = {
          headers,
          params: search,
          responseType,
        };

        const req = new HttpRequest(method, this.getBaseUrl() + resUrl, body, init);

        // intercept the request
        const interceptedReq = this.requestInterceptor(req);

        // make the request and store the observable for later transformation
        let observable: Observable<HttpResponse<object>> = this.http.request(interceptedReq);

        // intercept the response
        observable = this.responseInterceptor(observable, descriptor.adapter);

        return observable;
      };
      return descriptor;
    };
  };
}

export function paramBuilder(paramName: string) {
  return (key?: string | undefined) => {
    return (
      target: HttpService,
      propertyKey: string | symbol, // Name of the method
      parameterIndex: number,
    ) => {
      let metadataKey;
      if (typeof propertyKey === 'symbol') {
        metadataKey = `${propertyKey.toString()}_${paramName}_parameters`;
      } else {
        metadataKey = `${propertyKey}_${paramName}_parameters`;
      }

      const paramObj: any = {
        key,
        parameterIndex,
      };

      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}
