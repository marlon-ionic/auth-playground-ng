import { Injectable } from '@angular/core';
import { mobileAuthConfig, webAuthConfig } from '@env/environment';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { SessionVaultService } from '../session-vault/session-vault.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends IonicAuth {
  constructor(vaultService: SessionVaultService, platform: Platform) {
    const config = platform.is('hybrid') ? mobileAuthConfig : webAuthConfig;
    config.tokenStorageProvider = vaultService.vault;
    super(config);
  }
}
