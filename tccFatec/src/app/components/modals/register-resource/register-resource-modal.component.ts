import { Component, OnInit } from '@angular/core';
import { RegisterResourceValidatorService } from 'src/app/services/validators/register-resource/register-resource-validator.service';

@Component({
  selector: 'app-register-resource-modal',
  templateUrl: './register-resource-modal.component.html',
  styleUrls: ['./register-resource-modal.component.scss'],
})
export class RegisterResourceModalComponent implements OnInit {

  public registerResourceForm;
  public validationMessages;

  constructor(
    private registerResourceValidator: RegisterResourceValidatorService
  ) {
    this.registerResourceForm = this.registerResourceValidator.getRegisterResourceForm();
    this.validationMessages = this.registerResourceValidator.getRegisterResourceFormValidationsMessages();
  }

  ngOnInit() { }

  submit() {
    if (!this.registerResourceForm.valid) {
      this.registerResourceValidator.validateAllFormFields();
    } else {
      console.log(this.registerResourceForm.value);
    }
  }
}
