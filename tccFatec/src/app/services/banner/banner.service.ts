import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private banners: any;

  private data = [
    { id: 0, imgPath: 'https://tedideas.files.wordpress.com/2018/05/featured_art_grad_avice_istock.jpg' },
    { id: 1, imgPath: 'https://i.kym-cdn.com/photos/images/newsfeed/001/501/394/6f8.png' }
  ];


  constructor() { }

  getMainBanner() {
    return this.banners = this.data;
  }

  convertToBase64(data) {
    return window.btoa(data);
  }
}
