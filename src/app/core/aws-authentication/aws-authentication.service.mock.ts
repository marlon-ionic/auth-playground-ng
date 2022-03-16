import { AwsAuthenticationService } from './aws-authentication.service';

export const createAwsAuthenticationServiceMock = () =>
  jasmine.createSpyObj<AwsAuthenticationService>('AwsAuthenticationService', {
    login: Promise.resolve(),
    logout: Promise.resolve(),
    getAccessToken: Promise.resolve(''),
    isAuthenticated: Promise.resolve(false),
  });
