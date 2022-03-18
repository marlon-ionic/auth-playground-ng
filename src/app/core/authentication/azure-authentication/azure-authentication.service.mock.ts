import { AzureAuthenticationService } from './azure-authentication.service';

export const createAzureAuthenticationServiceMock = () =>
  jasmine.createSpyObj<AzureAuthenticationService>('AzureAuthenticationService', {
    login: Promise.resolve(),
    logout: Promise.resolve(),
    getAccessToken: Promise.resolve(''),
    isAuthenticated: Promise.resolve(false),
  });
