import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationExpeditorService, SessionVaultService } from '@app/core';
import { createAuthenticationExpeditorServiceMock, createSessionVaultServiceMock } from '@app/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { createNavControllerMock } from '@test/mocks';
import { click } from '@test/util';
import { UnlockPage } from './unlock.page';

describe('UnlockPage', () => {
  let component: UnlockPage;
  let fixture: ComponentFixture<UnlockPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UnlockPage],
        imports: [IonicModule],
        providers: [
          { provide: AuthenticationExpeditorService, useFactory: createAuthenticationExpeditorServiceMock },
          { provide: NavController, useFactory: createNavControllerMock },
          { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UnlockPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the unlock button', () => {
    it('unlocks the vault', () => {
      const sessionVault = TestBed.inject(SessionVaultService);
      const button = fixture.debugElement.query(By.css('[data-testid="unlock-button"]'));
      click(fixture, button.nativeElement);
      expect(sessionVault.unlock).toHaveBeenCalledTimes(1);
    });

    it('navigates to the root', fakeAsync(() => {
      const navController = TestBed.inject(NavController);
      const button = fixture.debugElement.query(By.css('[data-testid="unlock-button"]'));
      click(fixture, button.nativeElement);
      tick();
      expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
      expect(navController.navigateRoot).toHaveBeenCalledWith(['/']);
    }));

    describe('when the user cancels', () => {
      it('does not navigate', fakeAsync(() => {
        const navController = TestBed.inject(NavController);
        const sessionVault = TestBed.inject(SessionVaultService);
        (sessionVault.unlock as any).and.returnValue(Promise.reject(new Error('whatever, dude')));
        const button = fixture.debugElement.query(By.css('[data-testid="unlock-button"]'));
        click(fixture, button.nativeElement);
        tick();
        expect(navController.navigateRoot).not.toHaveBeenCalled();
      }));
    });
  });

  describe('the redo button', () => {
    it('performs a logout', () => {
      const auth = TestBed.inject(AuthenticationExpeditorService);
      const button = fixture.debugElement.query(By.css('[data-testid="redo-button"]'));
      click(fixture, button.nativeElement);
      expect(auth.logout).toHaveBeenCalledTimes(1);
    });

    it('navigates to the login page', fakeAsync(() => {
      const navController = TestBed.inject(NavController);
      const button = fixture.debugElement.query(By.css('[data-testid="redo-button"]'));
      click(fixture, button.nativeElement);
      tick();
      expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
      expect(navController.navigateRoot).toHaveBeenCalledWith(['/', 'login']);
    }));
  });
});
