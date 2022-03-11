import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { SessionVaultService } from '@app/core';
import { createSessionVaultServiceMock } from '@app/core/testing';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { createNavControllerMock, createPlatformMock } from '@test/mocks';

import { StartPage } from './start.page';

describe('StartPage', () => {
  let component: StartPage;
  let fixture: ComponentFixture<StartPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StartPage],
        imports: [IonicModule],
        providers: [
          { provide: NavController, useFactory: createNavControllerMock },
          { provide: Platform, useFactory: createPlatformMock },
          { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(StartPage);
      component = fixture.componentInstance;
    })
  );

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    describe('when the vault is locked', () => {
      beforeEach(() => {
        const sessionVault = TestBed.inject(SessionVaultService);
        (sessionVault.canUnlock as any).and.returnValue(Promise.resolve(true));
      });

      describe('on mobile', () => {
        beforeEach(() => {
          const platform = TestBed.inject(Platform);
          (platform.is as any).withArgs('hybrid').and.returnValue(true);
        });

        it('navigates to the unlock page', fakeAsync(() => {
          const navController = TestBed.inject(NavController);
          fixture.detectChanges();
          tick();
          expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
          expect(navController.navigateRoot).toHaveBeenCalledWith(['/', 'unlock']);
        }));
      });

      describe('on web', () => {
        beforeEach(() => {
          const platform = TestBed.inject(Platform);
          (platform.is as any).withArgs('hybrid').and.returnValue(false);
        });

        it('navigates to the tea list', fakeAsync(() => {
          const navController = TestBed.inject(NavController);
          fixture.detectChanges();
          tick();
          expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
          expect(navController.navigateRoot).toHaveBeenCalledWith(['/', 'tabs', 'tea-list']);
        }));
      });
    });

    describe('when the vault is unlocked', () => {
      beforeEach(() => {
        const sessionVault = TestBed.inject(SessionVaultService);
        (sessionVault.canUnlock as any).and.returnValue(Promise.resolve(false));
      });

      describe('on mobile', () => {
        beforeEach(() => {
          const platform = TestBed.inject(Platform);
          (platform.is as any).withArgs('hybrid').and.returnValue(true);
        });

        it('navigates to the tea list page', fakeAsync(() => {
          const navController = TestBed.inject(NavController);
          fixture.detectChanges();
          tick();
          expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
          expect(navController.navigateRoot).toHaveBeenCalledWith(['/', 'tabs', 'tea-list']);
        }));
      });

      describe('on web', () => {
        beforeEach(() => {
          const platform = TestBed.inject(Platform);
          (platform.is as any).withArgs('hybrid').and.returnValue(false);
        });

        it('navigates to the tea list', fakeAsync(() => {
          const navController = TestBed.inject(NavController);
          fixture.detectChanges();
          tick();
          expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
          expect(navController.navigateRoot).toHaveBeenCalledWith(['/', 'tabs', 'tea-list']);
        }));
      });
    });
  });
});
