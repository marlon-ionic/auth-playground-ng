import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SetupVaultGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasBeenVaultSetupBeenPresented = localStorage.getItem('hasBeenVaultSetupBeenPresented') === 'true';
    if (!hasBeenVaultSetupBeenPresented) {
      return this.router.parseUrl('/setup-vault');
    }
    return true;
  }
}
