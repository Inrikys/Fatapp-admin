import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from "@ionic/angular";
import { UserService } from "../../../services/api/user.service";
import { User } from "../../../interfaces/user-interface";
import { EditAccountValidatorService } from "../../../services/validators/edit-account-validator.service";
import { GlobalsService } from "../../../services/globals.service";
import { ChangePasswordModalComponent } from "../change-password-modal/change-password-modal.component";


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
    private global: GlobalsService,
  ) {
  }

  ngOnInit() {
    this.accountForm = this.editAccountValidator.getAccountForm();
    this.validationMessages = this.editAccountValidator.getValidationsMessages();
    this.initialize();
  }

  async initialize() {
    await this.userService.user.subscribe(data => {
      this.user = data;
    });

  }

  async updateUserData() {
    if (!this.accountForm.valid) {
      this.editAccountValidator.validateAllFormFields();
      this.global.createAlert('Por favor, preencha todos os campos obrigatórios...');
    } else {
      const loading = await this.loadingController.create({message: 'Carregando...'});
      await loading.present();
      const updateResponse = await this.userService.updateData(this.accountForm.value);
      await loading.dismiss();
      console.log(updateResponse);
    }
  }

  async closeModal() {
    await this.modalController.dismiss().then(() => {

    }).catch(error => {
      console.log(error);
    });
  }

  async goToChangePassword() {
    const modal = await this.modalController.create({
      component: ChangePasswordModalComponent,
    });
    modal.present();
  }
}
