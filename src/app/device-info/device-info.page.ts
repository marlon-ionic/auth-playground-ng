import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.page.html',
  styleUrls: ['./device-info.page.scss'],
})
export class DeviceInfoPage implements OnInit {
  biometricStrength: string;
  hasSecureHardware: boolean;
  isBiometricsEnabled: boolean;
  isBiometricsSupported: boolean;
  isPrivacyScreenEnabled: boolean;
  isLockedOutOfBiometrics: boolean;
  isSystemPasscodeSet: boolean;
  availableHardware: Array<string>;

  constructor() {}

  async ngOnInit() {
    this.biometricStrength = await Device.getBiometricStrengthLevel();
    this.hasSecureHardware = await Device.hasSecureHardware();
    this.isBiometricsEnabled = await Device.isBiometricsEnabled();
    this.isBiometricsSupported = await Device.isBiometricsSupported();
    this.isPrivacyScreenEnabled = await Device.isHideScreenOnBackgroundEnabled();
    this.isLockedOutOfBiometrics = await Device.isLockedOutOfBiometrics();
    this.isSystemPasscodeSet = await Device.isSystemPasscodeSet();
    this.availableHardware = await Device.getAvailableHardware();
  }

  async togglePrivacy() {
    await Device.setHideScreenOnBackground(!this.isPrivacyScreenEnabled);
    this.isPrivacyScreenEnabled = await Device.isHideScreenOnBackgroundEnabled();
  }
}
