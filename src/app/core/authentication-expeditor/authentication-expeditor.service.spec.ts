import { TestBed } from '@angular/core/testing';
import { TeaListPageRoutingModule } from '@app/tea-list/tea-list-routing.module';
import { AwsAuthenticationService } from '../aws-authentication/aws-authentication.service';
import { createAwsAuthenticationServiceMock } from '../aws-authentication/aws-authentication.service.mock';
import { AzureAuthenticationService } from '../azure-authentication/azure-authentication.service';
import { createAzureAuthenticationServiceMock } from '../azure-authentication/azure-authentication.service.mock';
import { SessionVaultService } from '../session-vault/session-vault.service';
import { createSessionVaultServiceMock } from '../testing';
import { AuthenticationExpeditorService } from './authentication-expeditor.service';

describe('AuthenticationExpeditorService', () => {
  let service: AuthenticationExpeditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AwsAuthenticationService, useFactory: createAwsAuthenticationServiceMock },
        { provide: AzureAuthenticationService, useFactory: createAzureAuthenticationServiceMock },
        { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
      ],
    });
    service = TestBed.inject(AuthenticationExpeditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
      it('calls the AWS logout', async () => {
        const azure = TestBed.inject(AzureAuthenticationService);
        await service.logout();
        expect(azure.logout).toHaveBeenCalledTimes(1);
      });
    });

    describe('get access token', () => {
      it('gets the AWS access token', async () => {
        const azure = TestBed.inject(AzureAuthenticationService);
        await service.getAccessToken();
        expect(azure.getAccessToken).toHaveBeenCalledTimes(1);
      });
    });

    describe('is authenticated', () => {
      it('checks with AWS if the user is authenticated', async () => {
        const azure = TestBed.inject(AzureAuthenticationService);
        await service.isAuthenticated();
        expect(azure.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });
  });
});
