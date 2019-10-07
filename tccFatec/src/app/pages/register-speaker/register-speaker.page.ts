import { Component, OnInit } from '@angular/core';
import { RegisterSpeakerValidatorService } from 'src/app/services/validators/register-speaker/register-speaker-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';

@Component({
  selector: 'app-register-speaker',
  templateUrl: './register-speaker.page.html',
  styleUrls: ['./register-speaker.page.scss'],
})
export class RegisterSpeakerPage {

  public speakerForm;
  public validationMessages;

  constructor(
    private speakerValidator: RegisterSpeakerValidatorService,
    private apiCore: FatappCoreService,
  ) {
    this.speakerForm = this.speakerValidator.getSpeakerForm();
    this.validationMessages = this.speakerValidator.getSpeakerFormValidationsMessages();
  }

  submit() {
    console.log(this.speakerForm);
    if (!this.speakerForm.valid) {
      this.speakerValidator.validateAllFormFields();
    } else {
      this.apiCore.registerSpeaker(this.speakerForm.value);

    }
  }

  }
