import { Component, OnInit } from '@angular/core';
import { EditEventValidatorService } from 'src/app/services/validators/edit-event/edit-event-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

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
  ) { }

  ngOnInit() {
    this.formEvent = this.eventValidator.getFormEvent();
    this.validationMessages = this.eventValidator.getFormEventValidationsMessages();
    this.getAllEvents();
    this.createForm();
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
      this.banner = await response.banner;
      this.eventId = await response.id;
      console.log(this.eventId);
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

      if (!this.formEvent.valid) {
        this.eventValidator.validateAllFormFields();
      } else {
        const response = await this.apiCore.updateEvent(this.formEvent.value, this.eventId);
        console.log(response);
        this.global.createToast('Evento alterado com sucesso!');
        this.navController.back();
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

  async removeEvent() {
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
          this.apiCore.removeEvent(this.eventId);
          this.global.createToast('Evento excluído com sucesso!');
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
