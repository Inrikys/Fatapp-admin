import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage {

  private activities = null;

  constructor(
    private tools: ToolsService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
  ) { }

  ionViewDidEnter() {
    this.getAllActivities();
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

}
