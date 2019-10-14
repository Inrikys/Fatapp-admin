import { Component, OnInit } from '@angular/core';
import { EditEventValidatorService } from 'src/app/services/validators/edit-event/edit-event-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage {

  public formEvent;
  public validationMessages;
  public events = null;
  public eventSearch = new Array();
  public title = '';
  public edition = '';
  public initialDate = '';
  public finalDate = '';
  public banner = '';
  public eventId = '';

  public eventSearchForm: FormGroup;


  constructor(
    private eventValidator: EditEventValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private navController: NavController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private tools: ToolsService,
  ) {
    this.formEvent = this.eventValidator.getFormEvent();
    this.validationMessages = this.eventValidator.getFormEventValidationsMessages();
    this.getAllEvents();
    this.createForm();
  }

  async ionViewDidEnter() {
    await this.getAllEvents();
  }

  async getAllEvents() {
    try {
      const loading = await this.global.createLoading('Carregando...');
      await loading.present();
      this.events = await this.apiCore.getAllEvents();
      await loading.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async selectEvent(id) {
    try {
      console.log(id);
      const response: any = await this.apiCore.getEvent(id);
      this.title = await response.title;
      this.edition = await response.edition;
      this.initialDate = await response.initialDate;
      this.finalDate = await response.finalDate;
      this.eventId = await response.id;
      this.removeDisable();
    } catch (error) {
      console.log(error);
    }
  }



  private createForm() {
    this.eventSearchForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
    });
  }

  async upload() {
    try {
      let validDate = false;
      if (!this.formEvent.valid) {
        this.eventValidator.validateAllFormFields();
      } else {
        const loading = await this.global.createLoading('Carregando...');
        await loading.present();
        validDate = await this.tools.validateDate(this.formEvent.value.initialDate, this.formEvent.value.finalDate);
        if (validDate) {
          const response = await this.apiCore.updateEvent(this.formEvent.value, this.eventId);
          await loading.dismiss();
          this.global.createToast('Evento alterado com sucesso!');
          this.navController.back();
        } else {
          await loading.dismiss();
          this.global.createAlert('Data inválida!');
        }
      }
    } catch (error) {
      console.log(error);

    }

  }

  removeDisable() {
    const elements = document.querySelectorAll(`.edit-form`);

    // @ts-ignore
    for (const item of elements) {
      item.removeAttribute('disabled');
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
          const loading = await this.global.createLoading('Carregando...');
          await loading.present();
          const response = await this.apiCore.removeEvent(id);
          this.global.createToast('Evento excluído com sucesso!');
          await loading.dismiss();
          this.getAllEvents();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getEventsSearch() {
    try {
      this.eventSearch = [];
      const eventsToFilter = this.events;

      const keyword = this.eventSearchForm.value.name;
      console.log(keyword);

      this.eventSearch = eventsToFilter.filter(collection => {
        console.log(collection);
        return collection.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });

    } catch (error) {
      console.log(error);
    }
  }
}
