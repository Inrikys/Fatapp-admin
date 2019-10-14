import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from 'src/app/services/globals.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  private events;
  private eventSearch = new Array();
  public eventSearchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private global: GlobalsService,
    private apiCore: FatappCoreService,
    private modalController: ModalController,
  ) {
    this.createForm();
    this.getEvents();
  }

  private createForm() {
    this.eventSearchForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
    });
  }

  async getEvents() {
    try {
      const loading = await this.global.createLoading('Carregando...');
      await loading.present();
      this.events = await this.apiCore.getAllEvents();
      console.log(this.events);
      await loading.dismiss();
    } catch (error) {

    }

  }

  async getEventsSearch() {
    try {
      this.eventSearch = [];
      const eventsToFilter = this.events;

      const keyword = this.eventSearchForm.value.name;

      this.eventSearch = eventsToFilter.filter(collection => {

        return collection.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
          || collection.edition.toLowerCase().indexOf(keyword.toLowerCase()) > -1
          || collection.initialDate.toLowerCase().indexOf(keyword.toLowerCase()) > -1
          || collection.finalDate.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });

    } catch (error) {
      console.log(error);
    }
  }

  async selectEvent(event) {
    this.modalController.dismiss(event);
  }

}
