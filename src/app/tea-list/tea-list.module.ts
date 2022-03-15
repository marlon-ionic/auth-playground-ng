import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TeaListPageRoutingModule } from './tea-list-routing.module';
import { TeaListPage } from './tea-list.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TeaListPageRoutingModule],
  declarations: [TeaListPage],
})
export class TeaListPageModule {}
