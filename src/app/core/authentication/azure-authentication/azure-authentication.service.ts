import { Injectable } from '@angular/core';
import { mobileAzureConfig, webAzureConfig } from '@env/environment';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { SessionVaultService } from '../../session-vault/session-vault.service';
import { Authenticator } from '../authenticator';

@Injectable({
  providedIn: 'root',
})
export class AzureAuthenticationService extends IonicAuth implements Authenticator {
  constructor(vaultService: SessionVaultService, platform: Platform) {
    const config = platform.is('hybrid') ? mobileAzureConfig : webAzureConfig;
    config.tokenStorageProvider = vaultService.vault;
    super(config);
  }

  async login(): Promise<void> {
    try {
      await super.login();
    } catch (err) {
      // This is to handle the password reset case for Azure AD
      //  This only applicable to Azure AD.
      console.log('login error:', +err);
      const message: string = err.message;
      // This is the error code returned by the Azure AD servers on failure.
      if (message !== undefined && message.startsWith('AADB2C90118')) {
        // The address you pass back is the custom user flow (policy) endpoint
        await super.login(
          'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_password_reset'
        );
      } else {
        throw new Error(err.error);
      }
    }
  }
}
