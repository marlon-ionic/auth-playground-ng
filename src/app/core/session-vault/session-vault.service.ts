import { Injectable } from '@angular/core';
import { AuthProvider } from '@app/models';
import { PinDialogComponent } from '@app/pin-dialog/pin-dialog.component';
import { BrowserVault, Device, DeviceSecurityType, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { ModalController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { VaultFactoryService } from './vault-factory.service';

export type UnlockMode = 'Device' | 'SessionPIN' | 'NeverLock' | 'ForceLogin';

@Injectable({
  providedIn: 'root',
})
export class SessionVaultService {
  vault: Vault | BrowserVault;
  private lockedSubject: Subject<boolean>;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private vaultFactory: VaultFactoryService
  ) {
    this.vault = this.vaultFactory.create({
      key: 'io.ionic.auth-playground-ng',
      type: VaultType.SecureStorage,
      lockAfterBackgrounded: 2000,
      shouldClearVaultAfterTooManyFailedAttempts: true,
      customPasscodeInvalidUnlockAttempts: 2,
      unlockVaultOnLoad: false,
    });

    this.lockedSubject = new Subject();

    this.vault.onLock(() => this.lockedSubject.next(true));
    this.vault.onUnlock(() => this.lockedSubject.next(false));

    this.vault.onPasscodeRequested(async (isPasscodeSetRequest: boolean) =>
      this.onPasscodeRequest(isPasscodeSetRequest)
    );
  }

  get locked() {
    return this.lockedSubject.asObservable();
  }

  clear(): Promise<void> {
    return this.vault.clear();
  }

  getKeys(): Promise<Array<string>> {
    return this.vault.getKeys();
  }

  getValue(key: string): Promise<any> {
    return this.vault.getValue(key);
  }

  lock(): Promise<void> {
    return this.vault.lock();
  }

  setValue(key: string, value: any): Promise<void> {
    return this.vault.setValue(key, value);
  }

  unlock(): Promise<void> {
    return this.vault.unlock();
  }

  async canUnlock(): Promise<boolean> {
    return !(await this.vault.isEmpty()) && (await this.vault.isLocked());
  }

  setAuthProvider(value: AuthProvider) {
    return this.setValue('AuthProvider', value);
  }

  getAuthProvider(): Promise<AuthProvider | undefined | null> {
    return this.getValue('AuthProvider');
  }

  async initializeUnlockMode() {
    if (this.platform.is('hybrid')) {
      if (await Device.isSystemPasscodeSet()) {
        await this.setUnlockMode('Device');
      } else {
        await this.setUnlockMode('SessionPIN');
      }
    }
  }

  setUnlockMode(unlockMode: UnlockMode): Promise<void> {
    let type: VaultType;
    let deviceSecurityType: DeviceSecurityType;

    switch (unlockMode) {
      case 'Device':
        type = VaultType.DeviceSecurity;
        deviceSecurityType = DeviceSecurityType.Both;
        break;

      case 'SessionPIN':
        type = VaultType.CustomPasscode;
        deviceSecurityType = DeviceSecurityType.None;
        break;

      case 'ForceLogin':
        type = VaultType.InMemory;
        deviceSecurityType = DeviceSecurityType.None;
        break;

      case 'NeverLock':
        type = VaultType.SecureStorage;
        deviceSecurityType = DeviceSecurityType.None;
        break;

      default:
        type = VaultType.SecureStorage;
        deviceSecurityType = DeviceSecurityType.None;
    }

    return this.vault.updateConfig({
      ...this.vault.config,
      type,
      deviceSecurityType,
    });
  }

  private async onPasscodeRequest(isPasscodeSetRequest: boolean): Promise<void> {
    const dlg = await this.modalController.create({
      backdropDismiss: false,
      component: PinDialogComponent,
      componentProps: {
        setPasscodeMode: isPasscodeSetRequest,
      },
    });
    dlg.present();
    const { data } = await dlg.onDidDismiss();
    this.vault.setCustomPasscode(data || '');
  }
}
