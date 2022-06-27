/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Device } from '@ionic-enterprise/identity-vault';
import { BehaviorSubject, Observable } from 'rxjs';

export enum SETTINGS_KEYS {
  HAS_SETUP_SECURITY = 'settingsKeyHasSetupSecurity',
  SECURITY = 'settingsKeySecurity',
  VAULT_TYPE = 'settingsKeyTypeOfVault',
}
export enum TYPE_OF_VAULT {
  BIOMETRICS = 'Device',
  CUSTOM_PASSCODE = 'SessionPIN',
}
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  hasSecureHardware$: Observable<boolean>;
  isBiometricsEnabled$: Observable<boolean>;
  isBiometricsSupported$: Observable<boolean>;
  isSystemPasscodeSet$: Observable<boolean>;
  hasSecureHardware = false;
  isBiometricsEnabled = false;
  isBiometricsSupported = false;
  isSystemPasscodeSet = false;

  private hasSecureHardwareSubject = new BehaviorSubject<boolean>(false);
  private isBiometricsEnabledSubject = new BehaviorSubject<boolean>(false);
  private isBiometricsSupportedSubject = new BehaviorSubject<boolean>(false);
  private isSystemPasscodeSetSubject = new BehaviorSubject<boolean>(false);
  private hasInitialized = false;

  constructor() {
    this.hasSecureHardware$ = this.hasSecureHardwareSubject.asObservable();
    this.isBiometricsEnabled$ = this.isBiometricsEnabledSubject.asObservable();
    this.isBiometricsSupported$ = this.isBiometricsSupportedSubject.asObservable();
    this.isSystemPasscodeSet$ = this.isSystemPasscodeSetSubject.asObservable();
  }

  async init(): Promise<void> {
    if (this.hasInitialized) {
      return;
    }
    await this.refreshDeviceVaultCapabilities();
    await App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        await this.refreshDeviceVaultCapabilities();
      }
    });
    this.hasInitialized = true;
  }

  async setItem(key: SETTINGS_KEYS, value: string | boolean | number) {
    await this.init();
    localStorage.setItem(key, value?.toString());
  }
  async getItem(key: string): Promise<boolean | null | string | number> {
    await this.init();
    const value = localStorage.getItem(key);
    if (value === null) {
      return null;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      return num;
    }
    const acceptableBools = ['true', 'false', '1', '0'];
    if (acceptableBools.includes(value.toLowerCase())) {
      return Boolean(value);
    }
    return value;
  }

  private async refreshDeviceVaultCapabilities(): Promise<void> {
    this.hasSecureHardware = await Device.hasSecureHardware();
    this.isBiometricsEnabled = await Device.isBiometricsEnabled();
    this.isBiometricsSupported = await Device.isBiometricsSupported();
    this.isSystemPasscodeSet = await Device.isSystemPasscodeSet();

    this.hasSecureHardwareSubject.next(this.hasSecureHardware);
    this.isBiometricsEnabledSubject.next(this.isBiometricsEnabled);
    this.isBiometricsSupportedSubject.next(this.isBiometricsSupported);
    this.isSystemPasscodeSetSubject.next(this.isSystemPasscodeSet);
  }
}
