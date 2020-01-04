import { Injectable } from '@angular/core';

@Injectable()
export class AppAdapter {
  static dummyAdapter(dummyResponse: object, device: string): object {
    return dummyResponse;
  }

  constructor() {}
}
