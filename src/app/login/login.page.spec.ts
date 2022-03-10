import { ComponentFixture, fakeAsync, TestBed, TestComponentRenderer, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '@app/core';
import { createAuthenticationServiceMock } from '@app/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { createNavControllerMock } from '@test/mocks';
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
    it('calls login', () => {
      const auth = TestBed.inject(AuthenticationService);
      const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
      click(button.nativeElement);
      expect(auth.login).toHaveBeenCalledTimes(1);
    });

    describe('on success', () => {
      beforeEach(() => {
        component.errorMessage = 'I am in error';
        fixture.detectChanges();
      });

      it('clears the error message', fakeAsync(() => {
        const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
        const msg = fixture.debugElement.query(By.css('[data-testid="error-message"]'));
        click(button.nativeElement);
        tick();
        fixture.detectChanges();
        expect(msg.nativeElement.textContent).toEqual('');
      }));

      it('navigates to the root', fakeAsync(() => {
        const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
        click(button.nativeElement);
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
        click(button.nativeElement);
        tick();
        fixture.detectChanges();
        expect(msg.nativeElement.textContent).toEqual('Login failed. Please try again.');
      }));

      it('does not navigate', fakeAsync(() => {
        const button = fixture.debugElement.query(By.css('[data-testid="signin-button"]'));
        click(button.nativeElement);
        tick();
        const navController = TestBed.inject(NavController);
        expect(navController.navigateRoot).not.toHaveBeenCalled();
      }));
    });
  });

  const click = (button: HTMLElement) => {
    const event = new Event('click');
    button.dispatchEvent(event);
    fixture.detectChanges();
  };
});
