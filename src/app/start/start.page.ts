import { Component, OnInit } from '@angular/core';
import { SessionVaultService } from '@app/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  constructor(
    private navContoller: NavController,
    private platform: Platform,
    private sessionVault: SessionVaultService
  ) {}

  async ngOnInit() {
    if (this.platform.is('hybrid') && (await this.sessionVault.canUnlock())) {
      this.navContoller.navigateRoot(['/', 'unlock']);
    } else {
      this.navContoller.navigateRoot(['/', 'tabs', 'tea-list']);
    }
  }
}
