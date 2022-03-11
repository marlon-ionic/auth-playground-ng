import { Component, OnInit } from '@angular/core';
import { SessionVaultService } from '@app/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.page.html',
  styleUrls: ['./unlock.page.scss'],
})
export class UnlockPage {
  constructor(private navController: NavController, private sessionVault: SessionVaultService) {}

  async unlock() {
    try {
      await this.sessionVault.vault.unlock();
      this.navController.navigateRoot(['/']);
    } catch (error) {}
  }

  redo() {}
}
