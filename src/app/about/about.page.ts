import { Component, OnInit } from '@angular/core';
import { AuthenticationExpeditorService, SessionVaultService } from '@app/core';
import { SettingsService, SETTINGS_KEYS, TYPE_OF_VAULT } from '@app/core/settings/settings.service';
import { AlertController, NavController } from '@ionic/angular';
import packageInfo from '../../../package.json';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss'],
})
export class AboutPage implements OnInit {
  vaultTypes: TYPE_OF_VAULT;
  author: string;
  name: string;
  version: string;
  authConnectVersion: string;
  identityVaultVersion: string;
  userSecurityPreference: string;

  constructor(
    private alertController: AlertController,
    private auth: AuthenticationExpeditorService,
    private navController: NavController,
    private vault: SessionVaultService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.author = packageInfo.author;
    this.name = packageInfo.name;
    this.version = packageInfo.version;
    this.authConnectVersion = packageInfo.dependencies['@ionic-enterprise/auth'];
    this.identityVaultVersion = packageInfo.dependencies['@ionic-enterprise/identity-vault'];
  }

  async ionViewDidEnter() {
    const result = await this.settingsService.getItem(SETTINGS_KEYS.VAULT_TYPE);
    this.userSecurityPreference = result as string;
  }

  async logout(): Promise<void> {
    await this.vault.setUnlockMode('NeverLock');
    await this.auth.logout();
    this.navController.navigateRoot(['/', 'login']);
  }

  async changeVault(e: CustomEvent) {
    const type: 'SessionPIN' | 'Device' = e.detail.value;
    const currentType = await this.settingsService.getItem(SETTINGS_KEYS.VAULT_TYPE);
    if (currentType === type) {
      return;
    }
    const alert = await this.alertController.create({
      header: 'Please confirm Vault Change',
      subHeader: 'Are you sure?',
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Change Vault',
          handler: async () => {
            await this.vault.setUnlockMode(type);
            await this.settingsService.setItem(SETTINGS_KEYS.VAULT_TYPE, type);
          },
        },
      ],
    });
    await alert.present();
  }
}
