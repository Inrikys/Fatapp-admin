import { Component, OnInit } from '@angular/core';
import { EditEventValidatorService } from 'src/app/services/validators/edit-event/edit-event-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

  public formEvent;
  public validationMessages;


  constructor(
    private eventValidator: EditEventValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private navController: NavController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.formEvent = this.eventValidator.getFormEvent();
    this.validationMessages = this.eventValidator.getFormEventValidationsMessages();
  }

  async getAllEvents() {
    this.apiCore.getAllEvents();
  }

  async upload() {
    if (!this.formEvent.valid) {
      this.eventValidator.validateAllFormFields();
    } else {
      this.apiCore.updateEvent(this.formEvent.value);
      this.global.createToast('Evento alterado com sucesso!');
      this.navController.back();
    }

  }

  async removeEvent(id) {
    try {
      let option = null;
      const alert = await this.alertController.create({
        message: 'Deseja mesmo remover?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              option = false;
            }
          }, {
            text: 'Ok',
            handler: () => {
              option = true;
            }
          }
        ]
      });

      await alert.present();

      alert.onDidDismiss().then(async () => {

        if (option) {
          this.apiCore.removeEvent(id);
          this.global.createToast('Evento excluído com sucesso!');
          this.getAllEvents();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
