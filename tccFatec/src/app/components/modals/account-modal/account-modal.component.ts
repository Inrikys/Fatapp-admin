import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {UserService} from "../../../services/api/user.service";
import {User} from "../../../interfaces/user-interface";
import {EditAccountValidatorService} from "../../../services/validators/edit-account-validator.service";


@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent implements OnInit {

    private user: User;
    accountForm;
    validationMessages;

  constructor(
      private userService: UserService,
      private loadingController: LoadingController,
      private modalController: ModalController,
      private editAccountValidator: EditAccountValidatorService,
  ) {
  }

  ngOnInit() {
    this.accountForm = this.editAccountValidator.getAccountForm();
    this.validationMessages = this.editAccountValidator.getValidationsMessages();
    this.initialize();
  }

  async initialize(){
    await this.userService.user.subscribe(  data => {
      this.user = data;
    });



  }

  async logout(){
    const loading = await this.loadingController.create({
      duration: 2000,
      message: 'Realizando logout...',
    });
    loading.present();
    await this.userService.logout();
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
