import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaultTypePipe } from './vault-type.pipe';

@NgModule({
  declarations: [VaultTypePipe],
  exports: [VaultTypePipe],
  imports: [CommonModule],
})
export class SharedModule {}
