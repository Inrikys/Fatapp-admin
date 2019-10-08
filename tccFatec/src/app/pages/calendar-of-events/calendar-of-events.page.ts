import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-calendar-of-events',
  templateUrl: './calendar-of-events.page.html',
  styleUrls: ['./calendar-of-events.page.scss'],
})
export class CalendarOfEventsPage {

  private roomId;


  constructor(
    private global: GlobalsService,
    private modalController: ModalController,
    private route: ActivatedRoute,
  ) {
    this.initialize();
  }

  async initialize() {
    try {
      if (this.route.snapshot.queryParams.id) {
        this.roomId = await this.route.snapshot.queryParams.id;
      } else {
        console.log('Parametro inválido!');
      }
    } catch (error) {
      console.log(error);
    }
  }


  async goToQrCode() {
    try {
      this.global.navigateByUrl('admin/qr-code?id=' + this.roomId);
    } catch (error) {
      console.log(error);
    }
  }

  async goToRegisterActivity() {
    try {
      this.global.navigateByUrl('admin/register-activity?id=' + this.roomId);
    } catch (error) {
      console.log(error);
    }

  }
}
