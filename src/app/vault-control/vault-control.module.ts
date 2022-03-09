import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { VaultControlPageRoutingModule } from './vault-control-routing.module';
import { VaultControlPage } from './vault-control.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule, VaultControlPageRoutingModule],
  declarations: [VaultControlPage],
})
export class VaultControlPageModule {}
