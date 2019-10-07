import { Component, OnInit } from '@angular/core';
import { RegisterActivityValidatorService } from 'src/app/services/validators/register-activity/register-activity-validator.service';

@Component({
  selector: 'app-register-activity-modal',
  templateUrl: './register-activity-modal.component.html',
  styleUrls: ['./register-activity-modal.component.scss'],
})
export class RegisterActivityModalComponent {

  public activityForm;
  public validationMessages;

  constructor(
    private activityValidator: RegisterActivityValidatorService,
  ) {
    this.activityForm = this.activityValidator.getActivityForm();
    this.validationMessages = this.activityValidator.getActivityFormValidationsMessages();
  }

  submit() {
    console.log(this.activityForm);
    if (!this.activityForm.valid) {
      this.activityValidator.validateAllFormFields();
    } else {

    }
  }
  selectCategory(query) {
    const element = document.querySelectorAll(`.${query}`);
    element.classList.add('active');
  }

}
