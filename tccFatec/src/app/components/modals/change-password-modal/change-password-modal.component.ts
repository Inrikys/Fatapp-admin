import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/api/user.service";
import {UserChangePasswordValidatorService} from "../../../services/validators/user-change-password-validator.service";

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {
  changePasswordForm;
  validationMessages;

  constructor(
    private userService: UserService,
    private userChangePasswordValidator: UserChangePasswordValidatorService,
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.userChangePasswordValidator.getChangePasswordForm();
    this.validationMessages = this.userChangePasswordValidator.getValidationsMessages();
  }

  async submit() {
    console.log(this.changePasswordForm);
    if (!this.changePasswordForm.valid) {
        this.userChangePasswordValidator.validateAllFormFields();
    } else {
        await this.userService.register(this.changePasswordForm.value);
        console.log(this.changePasswordForm);
    }
    const data = {
        password: this.changePasswordForm.get('password').value,
    };

    await this.changePasswordForm.changePassword(data);
  }

}
