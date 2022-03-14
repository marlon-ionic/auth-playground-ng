import { Component } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss'],
})
export class AboutPage {
  constructor(private auth: AuthenticationService, private navController: NavController) {}

  async logout(): Promise<void> {
    await this.auth.logout();
    this.navController.navigateRoot(['/', 'login']);
  }
}
