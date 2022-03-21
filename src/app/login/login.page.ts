import { Component, OnInit } from '@angular/core';
import { AuthenticationExpeditorService, SessionVaultService } from '@app/core';
import { AuthProvider } from '@app/models';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  errorMessage: string;
  password: string;

  constructor(
    private auth: AuthenticationExpeditorService,
    private navController: NavController,
    private vault: SessionVaultService
  ) {}

  async basicSignIn(): Promise<void> {
    this.errorMessage = '';
    try {
      await this.auth.login('Basic', { email: this.email, password: this.password });
      await this.vault.initializeUnlockMode();
      this.navController.navigateRoot(['/']);
    } catch (err) {
      this.errorMessage = 'Login failed. Please try again.';
    }
  }

  async oidcSignIn(provider: AuthProvider): Promise<void> {
    this.errorMessage = '';
    try {
      await this.auth.login(provider);
      await this.vault.initializeUnlockMode();
      this.navController.navigateRoot(['/']);
    } catch (err) {
      this.errorMessage = 'Login failed. Please try again.';
    }
  }
}
