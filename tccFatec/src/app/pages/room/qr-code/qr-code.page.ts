import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage {

  private qrcode: string = null;
  private lectureKey: any = 'teste';

  constructor(
    private route: ActivatedRoute,
  ) {
    this.getQrCode();
  }


  async getQrCode() {
    try {
      if (this.route.snapshot.queryParams.id) {
        const id = await this.route.snapshot.queryParams.id;
      }
      const link = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${this.lectureKey}`;
      this.qrcode = `<img src="${link}">`;
    } catch (error) {
      console.log(error);
    }
  }

}
