import { Component, OnInit } from '@angular/core';
import { SessionVaultService } from '@app/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.page.html',
  styleUrls: ['./value-list.page.scss'],
})
export class ValueListPage implements OnInit {
  values: Array<{ key: string; value?: any }>;

  constructor(private alertController: AlertController, private sessionVault: SessionVaultService) {}

  ngOnInit() {
    this.getValues();
  }

  async addValue() {
    const alert = await this.alertController.create({
      header: 'Key/Value Pair',
      subHeader: 'Enter a new key for new data or an existing key to supply different data for that key',
      inputs: [
        {
          name: 'key',
          type: 'text',
          placeholder: 'Key',
        },
        {
          name: 'value',
          id: 'value',
          type: 'textarea',
          placeholder: 'Value',
        },
      ],
      backdropDismiss: false,
      buttons: ['OK', 'Cancel'],
    });
    await alert.present();
    const { data, role } = await alert.onDidDismiss();
    if (data.values && data.values.key && data.values.value && role !== 'cancel') {
      await this.sessionVault.vault.setValue(data.values.key, data.values.value);
    }
    this.getValues();
  }

  private async getValues() {
    const keys = await this.sessionVault.vault.getKeys();
    this.values = await Promise.all(
      keys.map(async (key: string) => ({
        key,
        value: JSON.stringify(await this.sessionVault.vault.getValue(key), undefined, 2),
      }))
    );
  }
}
