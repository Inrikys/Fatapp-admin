import { Component, OnInit } from '@angular/core';
import { RegisterSpeakerValidatorService } from 'src/app/services/validators/register-speaker/register-speaker-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { NavController } from '@ionic/angular';

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
    private global: GlobalsService,
    private navController: NavController,
  ) {
    this.speakerForm = this.speakerValidator.getSpeakerForm();
    this.validationMessages = this.speakerValidator.getSpeakerFormValidationsMessages();
  }

  async submit() {
    try {
      if (!this.speakerForm.valid) {
        this.speakerValidator.validateAllFormFields();
      } else {
        const response: any = await this.apiCore.registerSpeaker(this.speakerForm.value);
        console.log(response);
        if (response.speakerName) {
          this.global.createAlert('Palestrante cadastrado com sucesso!');
          this.navController.back();
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

}
