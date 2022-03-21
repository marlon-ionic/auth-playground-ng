import { Component, OnInit } from '@angular/core';
import { AuthenticationExpeditorService, SessionVaultService } from '@app/core';
import { NavController } from '@ionic/angular';
import packageInfo from '../../../package.json';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss'],
})
export class AboutPage implements OnInit {
  author: string;
  name: string;
  version: string;
  authConnectVersion: string;
  identityVaultVersion: string;

  constructor(
    private auth: AuthenticationExpeditorService,
    private navController: NavController,
    private vault: SessionVaultService
  ) {}

  ngOnInit() {
    this.author = packageInfo.author;
    this.name = packageInfo.name;
    this.version = packageInfo.version;
    this.authConnectVersion = packageInfo.dependencies['@ionic-enterprise/auth'];
    this.identityVaultVersion = packageInfo.dependencies['@ionic-enterprise/identity-vault'];
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    await this.vault.setUnlockMode('NeverLock');
    this.navController.navigateRoot(['/', 'login']);
  }
}
