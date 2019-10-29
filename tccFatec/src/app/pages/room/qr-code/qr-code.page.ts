import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { NavController } from '@ionic/angular';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage {

  private qrcode: string = null;
  private activity = null;

  constructor(
    private route: ActivatedRoute,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private navController: NavController,
    private tools: ToolsService,
  ) {
    this.getQrCode();
  }


  async getQrCode() {
    try {
      const loading = await this.global.createLoading('Carregando Qr Code');
      loading.present();
      if (this.route.snapshot.queryParams.id) {
        const id = await this.route.snapshot.queryParams.id;
        this.activity = await this.apiCore.getActivity(id);
        if (!this.activity || this.activity === undefined || this.activity === '') {
          this.global.createAlert('Erro ao gerar QrCode');
          loading.dismiss();
          this.navController.back();
        } else {
          let formatedInitialTime = this.tools.formatFrontDate(this.activity.initialDate);
          let formatedFinalTime = this.tools.formatFrontTimeDate(this.activity.finalDate);
          let formatedTime = {
            formatedInitialTime,
            formatedFinalTime,
          };
          Object.assign(this.activity, formatedTime);
          const link = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${this.activity.qrCode}`;
          this.qrcode = `<img src="${link}">`;

        }

        loading.dismiss();
      }

    } catch (error) {
      console.log(error);
    }
  }

}
