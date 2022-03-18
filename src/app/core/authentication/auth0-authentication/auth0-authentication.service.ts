import { Injectable } from '@angular/core';
import { SessionVaultService } from '@app/core/session-vault/session-vault.service';
import { mobileAuth0Config, webAuth0Config } from '@env/environment';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { Authenticator } from '../authenticator';

@Injectable({
  providedIn: 'root',
})
export class Auth0AuthenticationService extends IonicAuth implements Authenticator {
  constructor(vaultService: SessionVaultService, platform: Platform) {
    const config = platform.is('hybrid') ? mobileAuth0Config : webAuth0Config;
    config.tokenStorageProvider = vaultService.vault;
    super(config);
  }
}
