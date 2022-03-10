import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  errorMessage: string;

  constructor(private auth: AuthenticationService, private navController: NavController) {}

  async signIn(): Promise<void> {
    this.errorMessage = '';
    try {
      await this.auth.login();
      this.navController.navigateRoot(['/']);
    } catch (err) {
      this.errorMessage = 'Login failed. Please try again.';
    }
  }
}