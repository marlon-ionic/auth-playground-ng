import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@app/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'tea-list',
        loadChildren: () => import('../tea-list/tea-list.module').then((m) => m.TeaListPageModule),
      },
      {
        path: 'vault-control',
        loadChildren: () => import('../vault-control/vault-control.module').then((m) => m.VaultControlPageModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then((m) => m.AboutPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
