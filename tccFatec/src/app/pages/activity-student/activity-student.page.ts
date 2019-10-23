import { Component } from '@angular/core';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-student',
  templateUrl: './activity-student.page.html',
  styleUrls: ['./activity-student.page.scss'],
})
export class ActivityStudentPage {

  private activity;
  private qrcode;

  constructor(
    private apiCore: FatappCoreService,
    private tools: ToolsService,
    private global: GlobalsService,
    private route: ActivatedRoute,
  ) {
    this.getQrCode();
  }


  async getQrCode() {
    try {
      let success = true;
      const loading = await this.global.createLoading('Carregando Qr Code');
      loading.present();
      if (this.route.snapshot.queryParams.id) {
        const id = await this.route.snapshot.queryParams.id;
        this.activity = await this.apiCore.getActivity(id);
        if (!this.activity || this.activity === undefined || this.activity === '') {
          this.global.createAlert('Erro ao gerar QrCode');
          success = false;
          loading.dismiss();
        } else {
          let formatedInitialTime = this.tools.formatFrontDate(this.activity.initialDate);
          let formatedFinalTime = this.tools.formatFrontTimeDate(this.activity.finalDate);
          let formatedTime = {
            formatedInitialTime,
            formatedFinalTime,
          };
          Object.assign(this.activity, formatedTime);
          if (success) {
            const link = `https://chart.googleapis.com/chart?chs=120x120&cht=qr&chl=${this.activity.qrCode}`;
            this.qrcode = `<img src="${link}">`;
            console.log("cheguei");
          }
          console.log(this.activity);

        }

        loading.dismiss();
      }

    } catch (error) {
      console.log(error);
    }
  }


}
