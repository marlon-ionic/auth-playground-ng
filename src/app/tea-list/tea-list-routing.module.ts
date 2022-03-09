import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeaListPage } from './tea-list.page';

const routes: Routes = [
  {
    path: '',
    component: TeaListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeaListPageRoutingModule {}
