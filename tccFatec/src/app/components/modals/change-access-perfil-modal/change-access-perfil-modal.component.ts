import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/api/user.service";
import {UserRegisterValidatorService} from "../../../services/validators/user-register-validator.service";
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-change-access-perfil-modal',
  templateUrl: './change-access-perfil-modal.component.html',
  styleUrls: ['./change-access-perfil-modal.component.scss'],
})
export class ChangeAccessPerfilModalComponent implements OnInit {

  passedUser;
  registerForm;
  validationMessages;

  constructor(
    private userRegisterValidator: UserRegisterValidatorService,
    private userService: UserService,
    private navParams: NavParams
    ) { }

  ngOnInit() {
    this.passedUser = this.navParams.get('user');
    this.registerForm = this.userRegisterValidator.getRegistrationForm();
    this.validationMessages = this.userRegisterValidator.getRegistrationFormValidationsMessages();
  }

  async register() {
    if (!this.registerForm.valid) {
        this.userRegisterValidator.validateAllFormFields();
    } else {
        // await this.userService.updateData(this.registerForm.value);
        console.log(this.registerForm);
    }
}

}
