import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupVaultPage } from './setup-vault.page';

const routes: Routes = [
  {
    path: '',
    component: SetupVaultPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupVaultPageRoutingModule {}
