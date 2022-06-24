import { TestBed } from '@angular/core/testing';

import { SetupVaultGuard } from './setup-vault.guard';

describe('SetupVaultGuard', () => {
  let guard: SetupVaultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SetupVaultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
