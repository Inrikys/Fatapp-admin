import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent implements OnInit {

  constructor(
      private storage: Storage,
      private loadingController: LoadingController,
  ) { }

  ngOnInit() {}

  async logout(){
    const loading = await this.loadingController.create({
      duration: 2000,
      message: 'Realizando logout...',
    });
    loading.present();
    await this.storage.remove('user_auth');
    loading.dismiss();
  }
}
