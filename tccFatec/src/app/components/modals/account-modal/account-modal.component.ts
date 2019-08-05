import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {UserService} from "../../../services/api/user.service";
import {UserAuth} from "../../../interfaces/user-auth-interface";


@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent implements OnInit {

  constructor(
      private user: UserService,
      private loadingController: LoadingController,
      private modalController: ModalController,
  ) {
  }

  ngOnInit() {}

  async logout(){
    const loading = await this.loadingController.create({
      duration: 2000,
      message: 'Realizando logout...',
    });
    loading.present();
    await this.user.logout();
    await this.closeModal();
    loading.dismiss();
  }

    async closeModal() {
        await this.modalController.dismiss().then(() => {

        }). catch(error => {
            console.log(error);
        });
    }
}
