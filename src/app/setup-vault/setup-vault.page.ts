import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionVaultService } from '@app/core/session-vault/session-vault.service';
import { App } from '@capacitor/app';
import { Device } from '@ionic-enterprise/identity-vault';

@Component({
  selector: 'app-setup-vault',
  templateUrl: './setup-vault.page.html',
  styleUrls: ['./setup-vault.page.scss'],
})
export class SetupVaultPage implements OnInit, OnDestroy {
  hasSecureHardware = false;
  isBiometricsEnabled = false;
  isBiometricsSupported = false;
  isSystemPasscodeSet = false;
  disableLock = true;
  constructor(private router: Router, private sessionVault: SessionVaultService) {}

  async ngOnInit(): Promise<void> {
    await this.refreshDeviceVaultCapabilities();
    await App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        await this.refreshDeviceVaultCapabilities();
      }
    });
  }
  async ngOnDestroy(): Promise<void> {
    await App.removeAllListeners();
  }

  async setupVault(typeOfVault: 'Biometrics' | 'CustomPasscode'): Promise<void> {
    switch (typeOfVault) {
      case 'Biometrics':
        await this.useDevice();
        break;
      case 'CustomPasscode':
        await this.useCustomPasscode();
    }
    localStorage.setItem('hasBeenVaultSetupBeenPresented', 'true');
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }

  async useCustomPasscode() {
    this.disableLock = false;
    return await this.sessionVault.setUnlockMode('SessionPIN');
  }

  async useSystemPasscode() {
    this.disableLock = false;
    return await this.sessionVault.setUnlockMode('SystemPIN');
  }

  async useDevice() {
    this.disableLock = false;
    return await this.sessionVault.setUnlockMode('Device');
  }

  private async refreshDeviceVaultCapabilities(): Promise<void> {
    this.hasSecureHardware = await Device.hasSecureHardware();
    this.isBiometricsEnabled = await Device.isBiometricsEnabled();
    this.isBiometricsSupported = await Device.isBiometricsSupported();
    this.isSystemPasscodeSet = await Device.isSystemPasscodeSet();
  }
}
