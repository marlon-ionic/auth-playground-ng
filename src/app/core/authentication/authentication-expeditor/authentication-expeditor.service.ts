import { Injectable } from '@angular/core';
import { AuthProvider } from '@app/models';
import { AwsAuthenticationService } from '../aws-authentication/aws-authentication.service';
import { AzureAuthenticationService } from '../azure-authentication/azure-authentication.service';
import { BasicAuthenticationService } from '../basic-authentication/basic-authentication.service';
import { SessionVaultService } from '../../session-vault/session-vault.service';
import { Authenticator } from '../authenticator';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationExpeditorService {
  constructor(
    private aws: AwsAuthenticationService,
    private azure: AzureAuthenticationService,
    private basic: BasicAuthenticationService,
    private vault: SessionVaultService
  ) {}

  async login(provider: AuthProvider, credentials?: { email: string; password: string }): Promise<void> {
    await this.vault.setAuthProvider(provider);
    const auth = this.getAuthService(provider);
    if (auth) {
      if (credentials) {
        return auth.login(credentials.email, credentials.password);
      } else {
        return auth.login();
      }
    }
    return Promise.reject(new Error(`Invalid provider: ${provider}`));
  }

  async logout(): Promise<void> {
    const provider = await this.vault.getAuthProvider();
    const auth = this.getAuthService(provider);
    if (auth) {
      return auth.logout();
    }
    return Promise.reject(new Error(`Invalid provider: ${provider}`));
  }

  async getAccessToken(): Promise<string> {
    const provider = await this.vault.getAuthProvider();
    const auth = this.getAuthService(provider);
    if (auth) {
      return auth.getAccessToken();
    }
    return Promise.reject(new Error(`Invalid provider: ${provider}`));
  }

  async isAuthenticated(): Promise<boolean> {
    const provider = await this.vault.getAuthProvider();
    const auth = this.getAuthService(provider);
    return !!auth && (await auth.isAuthenticated());
  }

  private getAuthService(provider: AuthProvider): Authenticator | null {
    switch (provider) {
      case 'AWS':
        return this.aws;

      case 'Azure':
        return this.azure;

      case 'Basic':
        return this.basic;

      default:
        return null;
    }
  }
}
