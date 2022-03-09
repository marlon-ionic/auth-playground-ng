import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
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
      {
        path: '',
        redirectTo: '/tabs/tea-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tea-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}