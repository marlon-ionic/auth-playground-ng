import { TestBed } from '@angular/core/testing';
import { PinDialogComponent } from '@app/pin-dialog/pin-dialog.component';
import { Device, DeviceSecurityType, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { ModalController, Platform } from '@ionic/angular';
import { createOverlayControllerMock, createOverlayElementMock, createPlatformMock } from '@test/mocks';
import { SessionVaultService, UnlockMode } from './session-vault.service';
import { VaultFactoryService } from './vault-factory.service';

describe('SessionVaultService', () => {
  let modal: HTMLIonModalElement;
  let service: SessionVaultService;

  let onLockCallback: () => void;
  let onPassocodeRequestedCallback: (flag: boolean) => Promise<void>;
  let mockVault: Vault;

  beforeEach(() => {
    mockVault = jasmine.createSpyObj<Vault>('Vault', {
      clear: Promise.resolve(),
      getKeys: Promise.resolve([]),
      getValue: Promise.resolve(),
      isEmpty: Promise.resolve(false),
      isLocked: Promise.resolve(false),
      lock: Promise.resolve(),
      setCustomPasscode: Promise.resolve(),
      setValue: Promise.resolve(),
      updateConfig: Promise.resolve(),
      unlock: Promise.resolve(),
      onLock: undefined,
      onUnlock: undefined,
      onPasscodeRequested: undefined,
    });
    (mockVault.onLock as any).and.callFake((callback: () => void) => (onLockCallback = callback));
    (mockVault.onPasscodeRequested as any).and.callFake(
      (callback: (flag: boolean) => Promise<void>) => (onPassocodeRequestedCallback = callback)
    );
    (mockVault.lock as any).and.callFake(() => onLockCallback());
    modal = createOverlayElementMock('Modal');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ModalController,
          useValue: createOverlayControllerMock('ModalController', modal),
        },
        { provide: Platform, useFactory: createPlatformMock },
        {
          provide: VaultFactoryService,
          useValue: jasmine.createSpyObj('VaultFactoryService', {
            create: mockVault,
          }),
        },
      ],
    });
    service = TestBed.inject(SessionVaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setUnlockMode', () => {
    [
      {
        unlockMode: 'Device',
        type: VaultType.DeviceSecurity,
        deviceSecurityType: DeviceSecurityType.Both,
      },
      {
        unlockMode: 'SessionPIN',
        type: VaultType.CustomPasscode,
        deviceSecurityType: DeviceSecurityType.None,
      },
      {
        unlockMode: 'ForceLogin',
        type: VaultType.InMemory,
        deviceSecurityType: DeviceSecurityType.None,
      },
      {
        unlockMode: 'NeverLock',
        type: VaultType.SecureStorage,
        deviceSecurityType: DeviceSecurityType.None,
      },
    ].forEach(({ unlockMode, type, deviceSecurityType }) =>
      it(`updates the configuration for ${unlockMode}`, async () => {
        const expectedConfig = {
          ...mockVault.config,
          type,
          deviceSecurityType,
        };
        await service.setUnlockMode(unlockMode as UnlockMode);
        expect(mockVault.updateConfig).toHaveBeenCalledTimes(1);
        expect(mockVault.updateConfig).toHaveBeenCalledWith(expectedConfig);
      })
    );
  });

  describe('initialize unlock type', () => {
    describe('on mobile', () => {
      beforeEach(() => {
        const platform = TestBed.inject(Platform);
        (platform.is as any).withArgs('hybrid').and.returnValue(true);
      });

      it('uses a session PIN if no system PIN is set', async () => {
        spyOn(Device, 'isSystemPasscodeSet').and.returnValue(Promise.resolve(false));
        const expectedConfig = {
          ...mockVault.config,
          type: VaultType.CustomPasscode,
          deviceSecurityType: DeviceSecurityType.None,
        };
        await service.initializeUnlockMode();
        expect(mockVault.updateConfig).toHaveBeenCalledTimes(1);
        expect(mockVault.updateConfig).toHaveBeenCalledWith(expectedConfig);
      });

      it('uses device security if a system PIN is set', async () => {
        spyOn(Device, 'isSystemPasscodeSet').and.returnValue(Promise.resolve(true));
        const expectedConfig = {
          ...mockVault.config,
          type: VaultType.DeviceSecurity,
          deviceSecurityType: DeviceSecurityType.Both,
        };
        await service.initializeUnlockMode();
        expect(mockVault.updateConfig).toHaveBeenCalledTimes(1);
        expect(mockVault.updateConfig).toHaveBeenCalledWith(expectedConfig);
      });
    });

    describe('on mobile', () => {
      beforeEach(() => {
        const platform = TestBed.inject(Platform);
        (platform.is as any).withArgs('hybrid').and.returnValue(false);
      });

      it('does not update the config', async () => {
        await service.initializeUnlockMode();
        expect(mockVault.updateConfig).not.toHaveBeenCalled();
      });
    });
  });

  describe('can unlock', () => {
    [
      { empty: false, locked: true },
      { empty: true, locked: true },
      { empty: false, locked: false },
    ].forEach(({ empty, locked }) =>
      it(`is ${empty && locked} for ${empty} ${locked}`, async () => {
        (mockVault.isEmpty as any).and.returnValue(Promise.resolve(empty));
        (mockVault.isLocked as any).and.returnValue(Promise.resolve(locked));
        expect(await service.canUnlock()).toBe(!empty && locked);
      })
    );
  });

  describe('onPasscodeRequested', () => {
    beforeEach(() => {
      (modal.onDidDismiss as any).and.returnValue(Promise.resolve({ role: 'cancel' }));
    });

    [true, false].forEach((setPasscode) => {
      it(`creates a PIN dialog, setting passcode: ${setPasscode}`, async () => {
        const modalController = TestBed.inject(ModalController);
        await onPassocodeRequestedCallback(setPasscode);
        expect(modalController.create).toHaveBeenCalledTimes(1);
        expect(modalController.create).toHaveBeenCalledWith({
          backdropDismiss: false,
          component: PinDialogComponent,
          componentProps: {
            setPasscodeMode: setPasscode,
          },
        });
      });
    });

    it('presents the modal', async () => {
      await onPassocodeRequestedCallback(false);
      expect(modal.present).toHaveBeenCalledTimes(1);
    });

    it('sets the custom passcode to the PIN', async () => {
      (modal.onDidDismiss as any).and.returnValue(Promise.resolve({ data: '4203', role: 'OK' }));
      await onPassocodeRequestedCallback(false);
      expect(mockVault.setCustomPasscode).toHaveBeenCalledTimes(1);
      expect(mockVault.setCustomPasscode).toHaveBeenCalledWith('4203');
    });

    it('sets the custom passcode to and empty string if the PIN is undefined', async () => {
      await onPassocodeRequestedCallback(false);
      expect(mockVault.setCustomPasscode).toHaveBeenCalledTimes(1);
      expect(mockVault.setCustomPasscode).toHaveBeenCalledWith('');
    });
  });

  describe('clear', () => {
    it('calls the vault clear', () => {
      service.clear();
      expect(mockVault.clear).toHaveBeenCalledTimes(1);
    });
  });

  describe('get keys', () => {
    it('calls the vault get keys', () => {
      service.getKeys();
      expect(mockVault.getKeys).toHaveBeenCalledTimes(1);
    });
  });

  describe('get value', () => {
    it('calls the vault get value', () => {
      service.getValue('foo-key');
      expect(mockVault.getValue).toHaveBeenCalledTimes(1);
      expect(mockVault.getValue).toHaveBeenCalledWith('foo-key');
    });
  });

  describe('lock', () => {
    it('calls the vault lock', () => {
      service.lock();
      expect(mockVault.lock).toHaveBeenCalledTimes(1);
    });
  });

  describe('set value', () => {
    it('calls the vault set value', () => {
      service.setValue('foo-key', 'some random value');
      expect(mockVault.setValue).toHaveBeenCalledTimes(1);
      expect(mockVault.setValue).toHaveBeenCalledWith('foo-key', 'some random value');
    });
  });

  describe('unlock', () => {
    it('calls the vault unlock', () => {
      service.unlock();
      expect(mockVault.unlock).toHaveBeenCalledTimes(1);
    });
  });

  describe('setAuthProvider', () => {
    it('sets the auth provider value in the vault', () => {
      service.setAuthProvider('AWS');
      expect(mockVault.setValue).toHaveBeenCalledTimes(1);
      expect(mockVault.setValue).toHaveBeenCalledWith('AuthProvider', 'AWS');
    });
  });

  describe('getAuthProvider', () => {
    it('resolves the set auth provider', async () => {
      (mockVault.getValue as any).withArgs('AuthProvider').and.returnValue(Promise.resolve('Azure'));
      expect(await service.getAuthProvider()).toEqual('Azure');
    });
  });
});
