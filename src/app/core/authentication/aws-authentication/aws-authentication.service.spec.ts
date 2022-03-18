import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { createPlatformMock } from '@test/mocks';
import { SessionVaultService } from '../../session-vault/session-vault.service';
import { createSessionVaultServiceMock } from '../../testing';
import { AwsAuthenticationService } from './aws-authentication.service';

describe('AwsAuthenticationService', () => {
  let service: AwsAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
        { provide: Platform, useFactory: createPlatformMock },
      ],
    });
    service = TestBed.inject(AwsAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
