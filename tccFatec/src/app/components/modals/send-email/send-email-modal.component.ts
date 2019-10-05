import { Component } from '@angular/core';
import { SendEmailValidatorService } from 'src/app/services/validators/send-email/send-email-validator.service';

@Component({
  selector: 'app-send-email-modal',
  templateUrl: './send-email-modal.component.html',
  styleUrls: ['./send-email-modal.component.scss'],
})
export class SendEmailModalComponent {

  public sendEmailForm;
  public validationMessages;

  constructor(
    private sendEmailValidator: SendEmailValidatorService
  ) {
    this.sendEmailForm = this.sendEmailValidator.getSendEmailForm();
    this.validationMessages = this.sendEmailValidator.getSendEmailFormValidationsMessages();
  }

  submit() {
    if (!this.sendEmailForm.valid) {
      this.sendEmailValidator.validateAllFormFields();
    } else {

    }
  }

}
