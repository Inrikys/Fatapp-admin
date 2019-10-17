import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { ToolsService } from 'src/app/services/tools/tools.service';


@Component({
  selector: 'app-calendar-of-events',
  templateUrl: './calendar-of-events.page.html',
  styleUrls: ['./calendar-of-events.page.scss'],
})
export class CalendarOfEventsPage {

  private roomId = null;
  private activities = null;

  constructor(
    private global: GlobalsService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private apiCore: FatappCoreService,
    private tools: ToolsService,
  ) {
    this.initialize();

  }

  ionViewDidEnter() {
    this.getAllActivities();
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

  async getAllActivities() {
    const loading = await this.global.createLoading('Carregando agenda...');
    await loading.present();
    this.activities = await this.apiCore.getAllActivity();
    if (this.activities) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.activities.length; i++) {
        this.tools.formatFrontTimeDate(this.activities[i].initialDate);
        let formatedInitialTime = this.tools.formatFrontTimeDate(this.activities[i].initialDate);
        let formatedFinalTime = this.tools.formatFrontTimeDate(this.activities[i].finalDate);
        let formatedTime = {
          formatedInitialTime,
          formatedFinalTime,
        };
        Object.assign(this.activities[i], formatedTime);
      }
      console.log(this.activities);
    }
    await loading.dismiss();
  }


  async goToQrCode(qrcode) {
    try {
      this.global.navigateByUrl('admin/qr-code?id=' + qrcode);
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
