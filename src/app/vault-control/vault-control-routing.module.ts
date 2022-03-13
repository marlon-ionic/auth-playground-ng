import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaultControlPage } from './vault-control.page';

const routes: Routes = [
  {
    path: '',
    component: VaultControlPage,
  },
  {
    path: 'device-info',
    loadChildren: () => import('../device-info/device-info.module').then((m) => m.DeviceInfoPageModule),
  },
  {
    path: 'value-list',
    loadChildren: () => import('../value-list/value-list.module').then((m) => m.ValueListPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaultControlPageRoutingModule {}
