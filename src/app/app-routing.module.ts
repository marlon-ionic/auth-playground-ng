import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'unlock',
    loadChildren: () => import('./unlock/unlock.module').then((m) => m.UnlockPageModule),
  },
  {
    path: 'setup-vault',
    loadChildren: () => import('./setup-vault/setup-vault.module').then((m) => m.SetupVaultPageModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
