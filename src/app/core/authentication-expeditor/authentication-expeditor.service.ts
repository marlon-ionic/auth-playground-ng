import { Injectable } from '@angular/core';
import { AuthProvider } from '@app/models';
import { AwsAuthenticationService } from '../aws-authentication/aws-authentication.service';
import { AzureAuthenticationService } from '../azure-authentication/azure-authentication.service';
import { SessionVaultService } from '../session-vault/session-vault.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationExpeditorService {
  constructor(
    private aws: AwsAuthenticationService,
    private azure: AzureAuthenticationService,
    private vault: SessionVaultService
  ) {}

  async login(provider: AuthProvider): Promise<void> {
    let res: Promise<void>;
    await this.vault.setAuthProvider(provider);

    switch (provider) {
      case 'AWS':
        res = this.aws.login();
        break;

      case 'Azure':
        res = this.azure.login();
        break;

      default:
        res = Promise.reject(new Error(`Invalid provider: ${provider}`));
        break;
    }

    return res;
  }

  async logout(): Promise<void> {
    const provider = await this.vault.getAuthProvider();
    let res: Promise<void>;
    switch (provider) {
      case 'AWS':
        res = this.aws.logout();
        break;

      case 'Azure':
        res = this.azure.logout();
        break;

      default:
        res = Promise.reject(new Error(`Invalid provider: ${provider}`));
        break;
    }

    return res;
  }

  async getAccessToken(): Promise<string> {
    const provider = await this.vault.getAuthProvider();
    let res: Promise<string>;
    switch (provider) {
      case 'AWS':
        res = this.aws.getAccessToken();
        break;

      case 'Azure':
        res = this.azure.getAccessToken();
        break;

      default:
        res = Promise.reject(new Error(`Invalid provider: ${provider}`));
        break;
    }

    return res;
  }

  async isAuthenticated(): Promise<boolean> {
    const provider = await this.vault.getAuthProvider();
    let res: Promise<boolean>;
    switch (provider) {
      case 'AWS':
        res = this.aws.isAuthenticated();
        break;

      case 'Azure':
        res = this.azure.isAuthenticated();
        break;

      default:
        res = Promise.reject(new Error(`Invalid provider: ${provider}`));
        break;
    }

    return res;
  }
}
