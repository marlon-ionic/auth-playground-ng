import { Injectable } from '@angular/core';
import { AwsAuthenticationService } from '../aws-authentication/aws-authentication.service';

export type AuthProvider = 'AWS';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationExpeditorService {
  constructor(private aws: AwsAuthenticationService) {}

  login(provider: AuthProvider): Promise<void> {
    return this.aws.login();
  }

  logout(): Promise<void> {
    return this.aws.logout();
  }

  getAccessToken(): Promise<string> {
    return this.aws.getAccessToken();
  }

  isAuthenticated(): Promise<boolean> {
    return this.aws.isAuthenticated();
  }
}
