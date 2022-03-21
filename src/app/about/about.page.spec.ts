import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationExpeditorService, SessionVaultService } from '@app/core';
import { createAuthenticationExpeditorServiceMock, createSessionVaultServiceMock } from '@app/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { createNavControllerMock } from '@test/mocks';
import { click } from '@test/util';
import { AboutPage } from './about.page';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPage],
      imports: [IonicModule],
      providers: [
        { provide: AuthenticationExpeditorService, useFactory: createAuthenticationExpeditorServiceMock },
        { provide: NavController, useFactory: createNavControllerMock },
        { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clicking the logout button', () => {
    it('calls logout', fakeAsync(() => {
      const auth = TestBed.inject(AuthenticationExpeditorService);
      const button = fixture.debugElement.query(By.css('[data-testid="logout-button"]'));
      click(fixture, button.nativeElement);
      tick();
      expect(auth.logout).toHaveBeenCalledTimes(1);
    }));

    it('resets the vault to the default unlock mode', fakeAsync(() => {
      const vault = TestBed.inject(SessionVaultService);
      const button = fixture.debugElement.query(By.css('[data-testid="logout-button"]'));
      click(fixture, button.nativeElement);
      tick();
      expect(vault.setUnlockMode).toHaveBeenCalledTimes(1);
      expect(vault.setUnlockMode).toHaveBeenCalledWith('NeverLock');
    }));

    it('navigates to the login page', fakeAsync(() => {
      const button = fixture.debugElement.query(By.css('[data-testid="logout-button"]'));
      const navController = TestBed.inject(NavController);
      click(fixture, button.nativeElement);
      tick();
      expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
      expect(navController.navigateRoot).toHaveBeenCalledWith(['/', 'login']);
    }));
  });
});
