import { Component, OnInit } from '@angular/core';
import { SessionVaultService } from '@app/core';

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.page.html',
  styleUrls: ['./value-list.page.scss'],
})
export class ValueListPage implements OnInit {
  values: Array<{ key: string; value?: any }>;

  constructor(private sessionVault: SessionVaultService) {}

  async ngOnInit() {
    const keys = await this.sessionVault.vault.getKeys();
    this.values = await Promise.all(
      keys.map(async (key: string) => ({
        key,
        value: JSON.stringify(await this.sessionVault.vault.getValue(key), undefined, 2),
      }))
    );
  }
}
