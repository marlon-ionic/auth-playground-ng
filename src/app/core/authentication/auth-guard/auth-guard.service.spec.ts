import { TestBed, inject } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { AuthGuardService } from './auth-guard.service';
import { AuthenticationExpeditorService } from '@app/core';
import { createAuthenticationExpeditorServiceMock } from '@app/core/testing';
import { createNavControllerMock } from '@test/mocks';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        {
          provide: AuthenticationExpeditorService,
          useFactory: createAuthenticationExpeditorServiceMock,
        },
        { provide: NavController, useFactory: createNavControllerMock },
      ],
    });
  });

  it('exists', inject([AuthGuardService], (guard: AuthGuardService) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    let guard: AuthGuardService;
    let authenticationService: AuthenticationExpeditorService;
    beforeEach(() => {
      guard = TestBed.inject(AuthGuardService);
      authenticationService = TestBed.inject(AuthenticationExpeditorService);
    });

    describe('when the user is authenticated', () => {
      beforeEach(() => {
        (authenticationService.isAuthenticated as any).and.returnValue(Promise.resolve(true));
      });

      it('resolves to true', async () => {
        expect(await guard.canActivate()).toEqual(true);
      });

      it('does not navigate', async () => {
        const navController = TestBed.inject(NavController);
        await guard.canActivate();
        expect(navController.navigateRoot).not.toHaveBeenCalled();
      });
    });

    describe('when the user is not authenticated', () => {
      beforeEach(() => {
        (authenticationService.isAuthenticated as any).and.returnValue(Promise.resolve(false));
      });

      it('resolves to false', async () => {
        expect(await guard.canActivate()).toEqual(false);
      });

      it('navigates to login', async () => {
        const navController = TestBed.inject(NavController);
        await guard.canActivate();
        expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
        expect(navController.navigateRoot).toHaveBeenCalledWith('/login');
      });
    });
  });
});
