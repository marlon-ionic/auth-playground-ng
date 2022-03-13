import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionVaultService } from '@app/core';
import { createSessionVaultServiceMock } from '@app/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValueListPage } from './value-list.page';

describe('ValueListPage', () => {
  let component: ValueListPage;
  let fixture: ComponentFixture<ValueListPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ValueListPage],
        imports: [IonicModule, RouterTestingModule],
        providers: [{ provide: SessionVaultService, useFactory: createSessionVaultServiceMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(ValueListPage);
      component = fixture.componentInstance;
      const sessionVault = TestBed.inject(SessionVaultService);
      (sessionVault.vault.getKeys as any).and.returnValue(Promise.resolve(['foo', 'bar', 'baz']));
      (sessionVault.vault.getValue as any).withArgs('foo').and.returnValue(Promise.resolve('cat'));
      (sessionVault.vault.getValue as any).withArgs('bar').and.returnValue(Promise.resolve('dog'));
      (sessionVault.vault.getValue as any).withArgs('baz').and.returnValue(Promise.resolve('mouse'));
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets the keys', () => {
    const sessionVault = TestBed.inject(SessionVaultService);
    expect(sessionVault.vault.getKeys).toHaveBeenCalledTimes(1);
  });

  it('displays the keys in a list', () => {
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('[data-testid="key-value-list"]'));
    const items = list.queryAll(By.css('ion-item'));
    expect(items.length).toEqual(3);
    expect(items[0].nativeElement.textContent).toContain('foo');
    expect(items[1].nativeElement.textContent).toContain('bar');
    expect(items[2].nativeElement.textContent).toContain('baz');
  });

  it('displays the values in the list', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('[data-testid="key-value-list"]'));
    const items = list.queryAll(By.css('ion-item'));
    expect(items.length).toEqual(3);
    expect(items[0].nativeElement.textContent).toContain('cat');
    expect(items[1].nativeElement.textContent).toContain('dog');
    expect(items[2].nativeElement.textContent).toContain('mouse');
  }));
});
