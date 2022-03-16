import { TestBed } from '@angular/core/testing';
import { TeaListPageRoutingModule } from '@app/tea-list/tea-list-routing.module';
import { AwsAuthenticationService } from '../aws-authentication/aws-authentication.service';
import { createAwsAuthenticationServiceMock } from '../aws-authentication/aws-authentication.service.mock';
import { AuthenticationExpeditorService } from './authentication-expeditor.service';

describe('AuthenticationExpeditorService', () => {
  let service: AuthenticationExpeditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AwsAuthenticationService, useFactory: createAwsAuthenticationServiceMock }],
    });
    service = TestBed.inject(AuthenticationExpeditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when using AWS', () => {
    describe('login', () => {
      it('calls the AWS login', () => {
        const aws = TestBed.inject(AwsAuthenticationService);
        service.login('AWS');
        expect(aws.login).toHaveBeenCalledTimes(1);
      });
    });

    describe('logout', () => {
      it('calls the AWS logout', () => {
        const aws = TestBed.inject(AwsAuthenticationService);
        service.logout();
        expect(aws.logout).toHaveBeenCalledTimes(1);
      });
    });

    describe('get access token', () => {
      it('gets the AWS access token', () => {
        const aws = TestBed.inject(AwsAuthenticationService);
        service.getAccessToken();
        expect(aws.getAccessToken).toHaveBeenCalledTimes(1);
      });
    });

    describe('is authenticated', () => {
      it('checks with AWS if the user is authenticated', () => {
        const aws = TestBed.inject(AwsAuthenticationService);
        service.isAuthenticated();
        expect(aws.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });
  });
});
