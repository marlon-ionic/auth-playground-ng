import { Component } from '@angular/core';
import { AuthenticationService, SessionVaultService } from '@app/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss'],
})
export class AboutPage {
  constructor(
    private auth: AuthenticationService,
    private navController: NavController,
    private sessionVault: SessionVaultService
  ) {}

  async logout(): Promise<void> {
    await this.auth.logout();
    await this.sessionVault.vault.clear();
    this.navController.navigateRoot(['/', 'login']);
  }
}
