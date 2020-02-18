import { Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Device, DEVICE } from '@ngx-toolkit/device';
import { Subscription } from 'rxjs';
import * as store from '../store';

/**
 * Supported device types
 */
export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'mobile',
  DESKTOP = 'website',
}

export enum OSType {
  ANDROID = 'android',
  IOS = 'ios',
}

export abstract class BaseSandbox implements OnDestroy {
  protected subscriptions: Array<Subscription> = [];

  constructor(protected appState$: Store<store.AppState>, @Inject(DEVICE) private device: Device) {
    /**
     * Use Following function to register events
     * to access globally
     */
    // this.registerEvents();
  }

  public getDeviceType(): string {
    if (this.device.isMobile()) {
      return DeviceType.MOBILE;
    } else if (this.device.isTablet()) {
      return DeviceType.TABLET;
    } else {
      return DeviceType.DESKTOP;
    }
  }

  public ngOnDestroy() {
    this.unregisterEvents();
  }

  /**
   * Unsubscribes from events
   */
  protected unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  // private registerEvents(): void {}
}
