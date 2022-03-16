import { AuthenticationExpeditorService } from './authentication-expeditor.service';

export const createAuthenticationExpeditorServiceMock = () =>
  jasmine.createSpyObj<AuthenticationExpeditorService>('AuthenticationExpeditorService', {
    login: Promise.resolve(),
    logout: Promise.resolve(),
    getAccessToken: Promise.resolve(''),
    isAuthenticated: Promise.resolve(false),
  });
