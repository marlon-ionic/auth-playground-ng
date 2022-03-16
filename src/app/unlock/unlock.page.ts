import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SessionVaultService } from '@app/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.page.html',
  styleUrls: ['./unlock.page.scss'],
})
export class UnlockPage {
  constructor(
    private authenticationService: AuthenticationService,
    private navController: NavController,
    private sessionVault: SessionVaultService
  ) {}

  async unlock() {
    try {
      await this.sessionVault.unlock();
      this.navController.navigateRoot(['/']);
    } catch (error) {
      // you could alert or otherwise set an error message
      // the most common failure is the user cancelling, so we just don't navigate
    }
  }

  async redo() {
    await this.authenticationService.logout();
    this.navController.navigateRoot(['/', 'login']);
  }
}
