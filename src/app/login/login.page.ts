import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SessionVaultService } from '@app/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  errorMessage: string;

  constructor(
    private auth: AuthenticationService,
    private navController: NavController,
    private vault: SessionVaultService
  ) {}

  async signIn(): Promise<void> {
    this.errorMessage = '';
    try {
      await this.auth.login();
      await this.vault.initializeUnlockType();
      this.navController.navigateRoot(['/']);
    } catch (err) {
      this.errorMessage = 'Login failed. Please try again.';
    }
  }
}
