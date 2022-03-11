import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SessionVaultService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(navController: NavController, vault: SessionVaultService) {
    vault.locked.subscribe((lock: boolean) => {
      if (lock) {
        navController.navigateRoot(['/', 'unlock']);
      }
    });
  }
}
