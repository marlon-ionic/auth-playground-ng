import { Auth0AuthenticationService } from './auth0-authentication.service';

export const createAuth0AuthenticationServiceMock = () =>
  jasmine.createSpyObj<Auth0AuthenticationService>('Auth0AuthenticationService', {
    login: Promise.resolve(),
    logout: Promise.resolve(),
    getAccessToken: Promise.resolve(''),
    isAuthenticated: Promise.resolve(false),
  });
