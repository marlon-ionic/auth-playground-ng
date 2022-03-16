import { Component, OnInit } from '@angular/core';
import { AuthenticationExpeditorService, SessionVaultService } from '@app/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  errorMessage: string;

  constructor(
    private auth: AuthenticationExpeditorService,
    private navController: NavController,
    private vault: SessionVaultService
  ) {}

  async signIn(): Promise<void> {
    this.errorMessage = '';
    try {
      await this.vault.initializeUnlockMode();
      await this.auth.login('AWS');
      this.navController.navigateRoot(['/']);
    } catch (err) {
      this.errorMessage = 'Login failed. Please try again.';
    }
  }
}
