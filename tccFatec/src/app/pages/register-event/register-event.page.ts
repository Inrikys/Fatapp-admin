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
export class RegisterEventPage implements OnInit {

  public formEvent;
  public validationMessages;


  constructor(
    private eventValidator: RegisterEventValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.formEvent = this.eventValidator.getFormEvent();
    this.validationMessages = this.eventValidator.getFormEventValidationsMessages();
  }

  async register() {
    if (!this.formEvent.valid) {
      this.eventValidator.validateAllFormFields();
    } else {
      this.apiCore.registerEvent(this.formEvent.value);
      this.global.createToast('Evento cadastrado com sucesso!');
      this.navController.back();
    }

  }
}
