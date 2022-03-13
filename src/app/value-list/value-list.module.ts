import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValueListPageRoutingModule } from './value-list-routing.module';

import { ValueListPage } from './value-list.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ValueListPageRoutingModule],
  declarations: [ValueListPage],
})
export class ValueListPageModule {}
