import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { DeviceInfoPage } from './device-info.page';

describe('DeviceInfoPage', () => {
  let component: DeviceInfoPage;
  let fixture: ComponentFixture<DeviceInfoPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeviceInfoPage],
        imports: [IonicModule, RouterTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(DeviceInfoPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
