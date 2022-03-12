import { Component } from '@angular/core';
import { SessionVaultService } from '@app/core';
import { Device, IdentityVaultConfig, VaultType } from '@ionic-enterprise/identity-vault';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-vault-control',
  templateUrl: 'vault-control.page.html',
  styleUrls: ['vault-control.page.scss'],
})
export class VaultControlPage {
  disableDeviceUnlock = true;
  disableCustomPasscode = true;
  disableInMemory = true;
  disableLock = true;
  config: IdentityVaultConfig;

  constructor(
    private navController: NavController,
    private platform: Platform,
    private sessionVault: SessionVaultService
  ) {
    this.config = sessionVault.vault.config;
  }

  async ionViewDidEnter() {
    if (this.platform.is('hybrid')) {
      this.disableCustomPasscode = false;
      this.disableInMemory = false;
      this.disableLock = this.sessionVault.vault.config.type === VaultType.SecureStorage;
      this.disableDeviceUnlock = !(await Device.isSystemPasscodeSet());
    }
  }

  clearVault() {
    return this.sessionVault.vault.clear();
  }

  lockVault() {
    return this.sessionVault.vault.lock();
  }

  useCustomPasscode() {
    this.disableLock = false;
    return this.sessionVault.setUnlockMode('SessionPIN');
  }

  useDevice() {
    this.disableLock = false;
    return this.sessionVault.setUnlockMode('Device');
  }

  clearOnLock() {
    this.disableLock = false;
    return this.sessionVault.setUnlockMode('ForceLogin');
  }

  neverLock() {
    this.disableLock = true;
    return this.sessionVault.setUnlockMode('NeverLock');
  }

  openDevicePage() {
    this.navController.navigateForward(['/', 'tabs', 'vault-control', 'device-info']);
  }
}
