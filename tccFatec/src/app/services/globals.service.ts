import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  async createLoading(message) {
    const loading = await this.loadingController.create({
      message
    });
    return loading;
  }

  async createAlert(message) {
    const alert = await this.alertController.create({
      header: 'Fatapp diz:',
      message,
    });
    alert.present();
  }

  async createToast(message) {
    const toast = await this.toastController.create({
      header: 'Fatapp diz:',
      message,
      position: 'top',
      color: 'primary',
      duration: 3000,
    });
    toast.present();
  }
}
