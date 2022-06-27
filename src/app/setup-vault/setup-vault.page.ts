import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionVaultService } from '@app/core/session-vault/session-vault.service';
import { SettingsService, SETTINGS_KEYS, TYPE_OF_VAULT } from '@app/core/settings/settings.service';

@Component({
  selector: 'app-setup-vault',
  templateUrl: './setup-vault.page.html',
  styleUrls: ['./setup-vault.page.scss'],
})
export class SetupVaultPage {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  vaultTypes = TYPE_OF_VAULT;
  disableLock = true;
  constructor(
    private router: Router,
    private sessionVault: SessionVaultService,
    public settingsService: SettingsService
  ) {}

  async setupVault(value: 'Device' | 'SessionPIN'): Promise<void> {
    switch (value) {
      case TYPE_OF_VAULT.BIOMETRICS:
        await this.useDevice();
        break;
      case TYPE_OF_VAULT.CUSTOM_PASSCODE:
        await this.useCustomPasscode();
    }
    await this.settingsService.setItem(SETTINGS_KEYS.HAS_SETUP_SECURITY, true);
    await this.settingsService.setItem(SETTINGS_KEYS.VAULT_TYPE, value);
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }

  async useCustomPasscode() {
    this.disableLock = false;
    return await this.sessionVault.setUnlockMode('SessionPIN');
  }

  async useDevice() {
    this.disableLock = false;
    return await this.sessionVault.setUnlockMode('Device');
  }
}
