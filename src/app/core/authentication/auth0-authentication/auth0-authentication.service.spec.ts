import { TestBed } from '@angular/core/testing';
import { SessionVaultService } from '@app/core/session-vault/session-vault.service';
import { createSessionVaultServiceMock } from '@app/core/testing';
import { Platform } from '@ionic/angular';
import { createPlatformMock } from '@test/mocks';

import { Auth0AuthenticationService } from './auth0-authentication.service';

describe('Auth0AuthenticationService', () => {
  let service: Auth0AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
        { provide: Platform, useFactory: createPlatformMock },
      ],
    });
    service = TestBed.inject(Auth0AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
