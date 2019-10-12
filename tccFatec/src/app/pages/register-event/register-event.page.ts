import { Component, OnInit } from '@angular/core';
import { RegisterEventValidatorService } from 'src/app/services/validators/register-event/register-event-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.page.html',
  styleUrls: ['./register-event.page.scss'],
})
export class RegisterEventPage {

  public formEvent;
  public validationMessages;
  public banner;


  constructor(
    private eventValidator: RegisterEventValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private navController: NavController,
  ) {
    this.formEvent = this.eventValidator.getFormEvent();
    this.validationMessages = this.eventValidator.getFormEventValidationsMessages();
  }

  async register() {
    if (!this.formEvent.valid) {
      this.eventValidator.validateAllFormFields();
    } else {
      this.formEvent.value.banner = this.banner;
      console.log(this.formEvent.value);
      const response = await this.apiCore.registerEvent(this.formEvent.value);
      console.log(response);
      await this.global.createToast('Evento cadastrado com sucesso!');
      this.navController.back();
    }
  }

  async selectBanner(event) {
    console.log(event);
    this.banner = await this.apiCore.toBase64(event.target.files[0]);
    console.log(this.banner);
  }
}
