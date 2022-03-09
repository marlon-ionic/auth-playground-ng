import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaultControlPage } from './vault-control.page';

const routes: Routes = [
  {
    path: '',
    component: VaultControlPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaultControlPageRoutingModule {}