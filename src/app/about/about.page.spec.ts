import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '@app/core';
import { createAuthenticationServiceMock } from '@app/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { createNavControllerMock } from '@test/mocks';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AboutPage } from './about.page';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AboutPage],
        imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
        providers: [
          { provide: AuthenticationService, useFactory: createAuthenticationServiceMock },
          { provide: NavController, useFactory: createNavControllerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AboutPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clicking the logout button', () => {
    it('calls logout', () => {
      const auth = TestBed.inject(AuthenticationService);
      const button = fixture.debugElement.query(By.css('[data-testid="logout-button"]'));
      click(button.nativeElement);
      expect(auth.logout).toHaveBeenCalledTimes(1);
    });

    it('navigates to the login page', fakeAsync(() => {
      const button = fixture.debugElement.query(By.css('[data-testid="logout-button"]'));
      const navController = TestBed.inject(NavController);
      click(button.nativeElement);
      tick();
      expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
      expect(navController.navigateRoot).toHaveBeenCalledWith(['/', 'login']);
    }));
  });

  const click = (button: HTMLElement) => {
    const event = new Event('click');
    button.dispatchEvent(event);
    fixture.detectChanges();
  };
});
