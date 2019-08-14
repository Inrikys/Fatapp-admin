import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/api/user.service";
import {UserRegisterValidatorService} from "../../services/validators/user-register-validator.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {

  registerForm;
  validationMessages;

  constructor(
      private userRegisterValidator: UserRegisterValidatorService,
      private userService: UserService,
  ) { }

  ngOnInit() {
      this.registerForm = this.userRegisterValidator.getRegistrationForm();
      this.validationMessages = this.userRegisterValidator.getRegistrationFormValidationsMessages();
  }


  async register() {
      if (!this.registerForm.valid) {
          this.userRegisterValidator.validateAllFormFields();
      } else {
          await this.userService.register(this.registerForm.value);
          console.log(this.registerForm);
      }
  }

}
