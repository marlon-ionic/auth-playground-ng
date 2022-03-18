import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationExpeditorService } from '../authentication-expeditor/authentication-expeditor.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationExpeditorService, private navCtrl: NavController) {}

  async canActivate(): Promise<boolean> {
    if (await this.auth.isAuthenticated()) {
      return true;
    } else {
      this.navCtrl.navigateRoot('/login');
      return false;
    }
  }
}
