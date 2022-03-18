import { Injectable } from '@angular/core';
import { mobileAWSConfig, webAWSConfig } from '@env/environment';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { SessionVaultService } from '../../session-vault/session-vault.service';
import { Authenticator } from '../authenticator';

@Injectable({
  providedIn: 'root',
})
export class AwsAuthenticationService extends IonicAuth implements Authenticator {
  constructor(vaultService: SessionVaultService, platform: Platform) {
    const config = platform.is('hybrid') ? mobileAWSConfig : webAWSConfig;
    config.tokenStorageProvider = vaultService.vault;
    super(config);
  }
}
