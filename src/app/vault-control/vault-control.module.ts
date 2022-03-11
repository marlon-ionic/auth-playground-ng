import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { VaultControlPageRoutingModule } from './vault-control-routing.module';
import { VaultControlPage } from './vault-control.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SharedModule, VaultControlPageRoutingModule],
  declarations: [VaultControlPage],
})
export class VaultControlPageModule {}
