import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { mobileAuthConfig, webAuthConfig } from '@env/environment';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { SessionVaultService } from '../session-vault/session-vault.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends IonicAuth {
  constructor(vaultService: SessionVaultService, platform: Platform) {
    const isCordovaApp = platform.is('cordova');
    const config = isCordovaApp ? mobileAuthConfig : webAuthConfig;
    config.tokenStorageProvider = vaultService.vault;
    super(config);
  }

  async getUserInfo(): Promise<User | undefined> {
    const idToken = await this.getIdToken();
    if (!idToken) {
      return;
    }

    let email = idToken.email;
    if (idToken.emails instanceof Array) {
      email = idToken.emails[0];
    }

    return {
      id: idToken.sub,
      email,
      firstName: idToken.firstName,
      lastName: idToken.lastName,
    };
  }
}
