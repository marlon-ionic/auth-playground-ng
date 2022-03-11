import { Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { Subject } from 'rxjs';
import { SessionVaultService } from './session-vault.service';

export const createSessionVaultServiceMock = () => {
  const mockVault = jasmine.createSpyObj<Vault>('Vault', {
    clear: Promise.resolve(),
    isEmpty: Promise.resolve(false),
    isLocked: Promise.resolve(false),
    lock: Promise.resolve(),
    setCustomPasscode: Promise.resolve(),
    updateConfig: Promise.resolve(),
    unlock: Promise.resolve(),
    onLock: undefined,
    onUnlock: undefined,
    onPasscodeRequested: undefined,
  });
  mockVault.config = {
    key: 'io.ionic.auth-playground-ng',
    type: VaultType.SecureStorage,
    lockAfterBackgrounded: 2000,
    shouldClearVaultAfterTooManyFailedAttempts: true,
    customPasscodeInvalidUnlockAttempts: 2,
    unlockVaultOnLoad: false,
  };

  const service = jasmine.createSpyObj<SessionVaultService>('SessionVaultService', {
    canUnlock: Promise.resolve(false),
    initializeUnlockType: Promise.resolve(),
    setUnlockMode: Promise.resolve(),
  });
  service.vault = mockVault;
  (service as any).locked = new Subject();
  return service;
};
