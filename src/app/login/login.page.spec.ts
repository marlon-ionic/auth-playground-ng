import { ComponentFixture, fakeAsync, TestBed, TestComponentRenderer, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService, SessionVaultService } from '@app/core';
import { createAuthenticationServiceMock, createSessionVaultServiceMock } from '@app/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { createNavControllerMock } from '@test/mocks';
import { click } from '@test/util';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginPage],
        imports: [IonicModule],
        providers: [
          { provide: AuthenticationService, useFactory: createAuthenticationServiceMock },
          {
            provide: NavController,
            useFactory: createNavControllerMock,
          },
          { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(LoginPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clicking the signin button', () => {
    it('initializes the vault to the default unlock mode', fakeAsync(() => {
      const vault = TestBed.inject(SessionVaultService);
      const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
      click(fixture, button.nativeElement);
      tick();
      expect(vault.initializeUnlockType).toHaveBeenCalledTimes(1);
    }));

    it('calls login', fakeAsync(() => {
      const auth = TestBed.inject(AuthenticationService);
      const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
      click(fixture, button.nativeElement);
      tick();
      expect(auth.login).toHaveBeenCalledTimes(1);
    }));

    describe('on success', () => {
      beforeEach(() => {
        component.errorMessage = 'I am in error';
        fixture.detectChanges();
      });

      it('clears the error message', fakeAsync(() => {
        const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
        const msg = fixture.debugElement.query(By.css('[data-testid="error-message"]'));
        click(fixture, button.nativeElement);
        tick();
        fixture.detectChanges();
        expect(msg.nativeElement.textContent).toEqual('');
      }));

      it('navigates to the root', fakeAsync(() => {
        const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
        click(fixture, button.nativeElement);
        tick();
        const navController = TestBed.inject(NavController);
        expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
        expect(navController.navigateRoot).toHaveBeenCalledWith(['/']);
      }));
    });

    describe('on failure', () => {
      beforeEach(() => {
        const auth = TestBed.inject(AuthenticationService);
        (auth.login as any).and.returnValue(Promise.reject(new Error('this shall not be')));
      });

      it('display a generic error message', fakeAsync(() => {
        const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
        const msg = fixture.debugElement.query(By.css('[data-testid="error-message"]'));
        click(fixture, button.nativeElement);
        tick();
        fixture.detectChanges();
        expect(msg.nativeElement.textContent).toEqual('Login failed. Please try again.');
      }));

      it('does not navigate', fakeAsync(() => {
        const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
        click(fixture, button.nativeElement);
        tick();
        const navController = TestBed.inject(NavController);
        expect(navController.navigateRoot).not.toHaveBeenCalled();
      }));
    });
  });
});
