import { TestBed } from '@angular/core/testing';
import { AwsAuthenticationService } from '../aws-authentication/aws-authentication.service';
import { createAwsAuthenticationServiceMock } from '../aws-authentication/aws-authentication.service.mock';
import { AzureAuthenticationService } from '../azure-authentication/azure-authentication.service';
import { createAzureAuthenticationServiceMock } from '../azure-authentication/azure-authentication.service.mock';
import { BasicAuthenticationService } from '../basic-authentication/basic-authentication.service';
import { createBasicAuthenticationServiceMock } from '../basic-authentication/basic-authentication.service.mock';
import { SessionVaultService } from '../../session-vault/session-vault.service';
import { createSessionVaultServiceMock } from '../../testing';
import { AuthenticationExpeditorService } from './authentication-expeditor.service';
import { Auth0AuthenticationService } from '../auth0-authentication/auth0-authentication.service';
import { createAuth0AuthenticationServiceMock } from '../auth0-authentication/auth0-authentication.service.mock';

describe('AuthenticationExpeditorService', () => {
  let service: AuthenticationExpeditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth0AuthenticationService, useFactory: createAuth0AuthenticationServiceMock },
        { provide: AwsAuthenticationService, useFactory: createAwsAuthenticationServiceMock },
        { provide: AzureAuthenticationService, useFactory: createAzureAuthenticationServiceMock },
        { provide: BasicAuthenticationService, useFactory: createBasicAuthenticationServiceMock },
        { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
      ],
    });
    service = TestBed.inject(AuthenticationExpeditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when using Auth0', () => {
    beforeEach(() => {
      const vault = TestBed.inject(SessionVaultService);
      (vault.getAuthProvider as any).and.returnValue(Promise.resolve('Auth0'));
    });

    describe('login', () => {
      it('calls the Auth0 login', async () => {
        const aws = TestBed.inject(Auth0AuthenticationService);
        await service.login('Auth0');
        expect(aws.login).toHaveBeenCalledTimes(1);
      });

      it('saves the auth provider', async () => {
        const vault = TestBed.inject(SessionVaultService);
        await service.login('Auth0');
        expect(vault.setAuthProvider).toHaveBeenCalledTimes(1);
        expect(vault.setAuthProvider).toHaveBeenCalledWith('Auth0');
      });
    });

    describe('logout', () => {
      it('calls the Auth0 logout', async () => {
        const aws = TestBed.inject(Auth0AuthenticationService);
        await service.logout();
        expect(aws.logout).toHaveBeenCalledTimes(1);
      });
    });

    describe('get access token', () => {
      it('gets the Auth0 access token', async () => {
        const aws = TestBed.inject(Auth0AuthenticationService);
        await service.getAccessToken();
        expect(aws.getAccessToken).toHaveBeenCalledTimes(1);
      });
    });

    describe('is authenticated', () => {
      it('checks with Auth0 if the user is authenticated', async () => {
        const aws = TestBed.inject(Auth0AuthenticationService);
        await service.isAuthenticated();
        expect(aws.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when using AWS', () => {
    beforeEach(() => {
      const vault = TestBed.inject(SessionVaultService);
      (vault.getAuthProvider as any).and.returnValue(Promise.resolve('AWS'));
    });

    describe('login', () => {
      it('calls the AWS login', async () => {
        const aws = TestBed.inject(AwsAuthenticationService);
        await service.login('AWS');
        expect(aws.login).toHaveBeenCalledTimes(1);
      });

      it('saves the auth provider', async () => {
        const vault = TestBed.inject(SessionVaultService);
        await service.login('AWS');
        expect(vault.setAuthProvider).toHaveBeenCalledTimes(1);
        expect(vault.setAuthProvider).toHaveBeenCalledWith('AWS');
      });
    });

    describe('logout', () => {
      it('calls the AWS logout', async () => {
        const aws = TestBed.inject(AwsAuthenticationService);
        await service.logout();
        expect(aws.logout).toHaveBeenCalledTimes(1);
      });
    });

    describe('get access token', () => {
      it('gets the AWS access token', async () => {
        const aws = TestBed.inject(AwsAuthenticationService);
        await service.getAccessToken();
        expect(aws.getAccessToken).toHaveBeenCalledTimes(1);
      });
    });

    describe('is authenticated', () => {
      it('checks with AWS if the user is authenticated', async () => {
        const aws = TestBed.inject(AwsAuthenticationService);
        await service.isAuthenticated();
        expect(aws.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when using Azure', () => {
    beforeEach(() => {
      const vault = TestBed.inject(SessionVaultService);
      (vault.getAuthProvider as any).and.returnValue(Promise.resolve('Azure'));
    });

    describe('login', () => {
      it('calls the Azure login', async () => {
        const azure = TestBed.inject(AzureAuthenticationService);
        await service.login('Azure');
        expect(azure.login).toHaveBeenCalledTimes(1);
      });

      it('saves the auth provider', async () => {
        const vault = TestBed.inject(SessionVaultService);
        await service.login('Azure');
        expect(vault.setAuthProvider).toHaveBeenCalledTimes(1);
        expect(vault.setAuthProvider).toHaveBeenCalledWith('Azure');
      });
    });

    describe('logout', () => {
      it('calls the Azure logout', async () => {
        const azure = TestBed.inject(AzureAuthenticationService);
        await service.logout();
        expect(azure.logout).toHaveBeenCalledTimes(1);
      });
    });

    describe('get access token', () => {
      it('gets the Azure access token', async () => {
        const azure = TestBed.inject(AzureAuthenticationService);
        await service.getAccessToken();
        expect(azure.getAccessToken).toHaveBeenCalledTimes(1);
      });
    });

    describe('is authenticated', () => {
      it('checks with Azure if the user is authenticated', async () => {
        const azure = TestBed.inject(AzureAuthenticationService);
        await service.isAuthenticated();
        expect(azure.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when using Basic', () => {
    beforeEach(() => {
      const vault = TestBed.inject(SessionVaultService);
      (vault.getAuthProvider as any).and.returnValue(Promise.resolve('Basic'));
    });

    describe('login', () => {
      it('calls the Basic login', async () => {
        const basic = TestBed.inject(BasicAuthenticationService);
        await service.login('Basic', { email: 'fred.rogers@thehood.org', password: 'Mak3Be!ieve' });
        expect(basic.login).toHaveBeenCalledTimes(1);
        expect(basic.login).toHaveBeenCalledWith('fred.rogers@thehood.org', 'Mak3Be!ieve');
      });

      it('saves the auth provider', async () => {
        const vault = TestBed.inject(SessionVaultService);
        await service.login('Basic', { email: 'fred.rogers@thehood.org', password: 'Mak3Be!ieve' });
        expect(vault.setAuthProvider).toHaveBeenCalledTimes(1);
        expect(vault.setAuthProvider).toHaveBeenCalledWith('Basic');
      });
    });

    describe('logout', () => {
      it('calls the Basic logout', async () => {
        const basic = TestBed.inject(BasicAuthenticationService);
        await service.logout();
        expect(basic.logout).toHaveBeenCalledTimes(1);
      });
    });

    describe('get access token', () => {
      it('gets the Basic access token', async () => {
        const basic = TestBed.inject(BasicAuthenticationService);
        await service.getAccessToken();
        expect(basic.getAccessToken).toHaveBeenCalledTimes(1);
      });
    });

    describe('is authenticated', () => {
      it('checks with Basic if the user is authenticated', async () => {
        const basic = TestBed.inject(BasicAuthenticationService);
        await service.isAuthenticated();
        expect(basic.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });
  });
});
