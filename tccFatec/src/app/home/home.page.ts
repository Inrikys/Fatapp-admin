import { Component } from '@angular/core';
import {BannerService} from '../services/banner/banner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private banners: any;

  sliderConfig = {
    spaceBetween: 1,

  };
  constructor(
      private bannerService: BannerService,
  ) {
    this.initialize();
  }

  async initialize() {
    await this.getBanner();
  }

  async getBanner(){
    this.banners = await this.bannerService.getMainBanner();
    console.log(this.banners);
  }

}
