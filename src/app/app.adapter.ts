import { Injectable } from '@angular/core';

@Injectable()
export class AppAdapter {
  static dummyAdapter(dummyResponse: object): object {
    return dummyResponse;
  }
}
