import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SettingsService, SETTINGS_KEYS } from '@app/core/settings/settings.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SetupVaultGuard implements CanActivate {
  constructor(private router: Router, private settingsService: SettingsService) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const hasSetupBeenPresented = (await this.settingsService.getItem(SETTINGS_KEYS.HAS_SETUP_SECURITY)) === true;
    if (!hasSetupBeenPresented) {
      return this.router.parseUrl('/setup-vault');
    }
    return true;
  }
}
