import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SessionVaultService } from '@app/core';
import { createSessionVaultServiceMock } from '@app/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { createNavControllerMock, createPlatformMock } from '@test/mocks';
import { click } from '@test/util';
import { VaultControlPage } from './vault-control.page';

describe('VaultControlPage', () => {
  let component: VaultControlPage;
  let fixture: ComponentFixture<VaultControlPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VaultControlPage],
        imports: [IonicModule, SharedModule],
        providers: [
          { provide: NavController, useFactory: createNavControllerMock },
          { provide: Platform, useFactory: createPlatformMock },
          { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(VaultControlPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on mobile', () => {
    let sessionVault: SessionVaultService;
    beforeEach(async () => {
      const platform = TestBed.inject(Platform);
      (platform.is as any).withArgs('hybrid').and.returnValue(true);
      await component.ionViewDidEnter();
      sessionVault = TestBed.inject(SessionVaultService);
    });

    it('sets the device vault type', () => {
      const button = fixture.debugElement.query(By.css('[data-testid="use-device-button"]'));
      click(fixture, button.nativeElement);
      expect(sessionVault.setUnlockMode).toHaveBeenCalledTimes(1);
      expect(sessionVault.setUnlockMode).toHaveBeenCalledWith('Device');
    });

    it('sets the custom passcode type', () => {
      const button = fixture.debugElement.query(By.css('[data-testid="use-custom-passcode-button"]'));
      click(fixture, button.nativeElement);
      expect(sessionVault.setUnlockMode).toHaveBeenCalledTimes(1);
      expect(sessionVault.setUnlockMode).toHaveBeenCalledWith('SessionPIN');
    });

    it('sets the secure storage type', () => {
      const button = fixture.debugElement.query(By.css('[data-testid="never-lock-button"]'));
      click(fixture, button.nativeElement);
      expect(sessionVault.setUnlockMode).toHaveBeenCalledTimes(1);
      expect(sessionVault.setUnlockMode).toHaveBeenCalledWith('NeverLock');
    });

    it('sets the in memory type', () => {
      const button = fixture.debugElement.query(By.css('[data-testid="clear-on-lock-button"]'));
      click(fixture, button.nativeElement);
      expect(sessionVault.setUnlockMode).toHaveBeenCalledTimes(1);
      expect(sessionVault.setUnlockMode).toHaveBeenCalledWith('ForceLogin');
    });

    it('locks the vault', () => {
      const button = fixture.debugElement.query(By.css('[data-testid="lock-vault-button"]'));
      click(fixture, button.nativeElement);
      expect(sessionVault.vault.lock).toHaveBeenCalledTimes(1);
    });

    it('clears the vault', () => {
      const button = fixture.debugElement.query(By.css('[data-testid="clear-vault-button"]'));
      click(fixture, button.nativeElement);
      expect(sessionVault.vault.clear).toHaveBeenCalledTimes(1);
    });
  });
});
