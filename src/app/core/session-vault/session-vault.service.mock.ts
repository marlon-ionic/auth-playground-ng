import { SessionVaultService } from './session-vault.service';

export const createSessionVaultServiceMock = () =>
  jasmine.createSpyObj<SessionVaultService>('SessionVaultService', {
    canUnlock: Promise.resolve(false),
    setUnlockMode: Promise.resolve(),
  });
