import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { createPlatformMock } from '@test/mocks';
import { SessionVaultService } from '../session-vault/session-vault.service';
import { createSessionVaultServiceMock } from '../testing';
import { AzureAuthenticationService } from './azure-authentication.service';

describe('AzureAuthenticationService', () => {
  let service: AzureAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
        { provide: Platform, useFactory: createPlatformMock },
      ],
    });
    service = TestBed.inject(AzureAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
