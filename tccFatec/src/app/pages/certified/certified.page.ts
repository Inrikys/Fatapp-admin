import { Component, OnInit } from '@angular/core';
import { CertifiedValidatorService } from 'src/app/services/validators/certified/certified.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-certified',
  templateUrl: './certified.page.html',
  styleUrls: ['./certified.page.scss'],
})
export class CertifiedPage {

  public certifiedForm;
  public validationMessages;
  public certifieds: any = null;

  constructor(
    private certifiedFormValidator: CertifiedValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private alertController: AlertController,
  ) {
    this.certifiedForm = this.certifiedFormValidator.getCertifiedForm();
    this.validationMessages = this.certifiedFormValidator.getCertifiedFormFormValidationsMessages();
  }

  ionViewDidEnter() {
    this.getAllCertifieds();
  }

  async submit() {
    try {
      if (!this.certifiedForm.valid) {
        this.certifiedFormValidator.validateAllFormFields();
      } else {
        const loading = await this.global.createLoading('Carregando...');
        await loading.present();
        const response = await this.apiCore.registerCertified(this.certifiedForm.value);
        this.getAllCertifieds();
        await loading.dismiss();
      }
    } catch (error) {
      console.log(error);
    }

  }

  async getAllCertifieds() {
    try {
      const loading = await this.global.createLoading('Carregando...');
      await loading.present();
      const response = await this.apiCore.getAllCertifieds();
      this.certifieds = response;
      await loading.dismiss();
    } catch (error) {
      console.log(error);
      this.global.createAlert(error);
    }
  }

  async removeCertified(id) {
    try {

      let option = null;
      const alert = await this.alertController.create({
        message: 'Deseja mesmo remover?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              option = false;
            }
          }, {
            text: 'Ok',
            handler: () => {
              option = true;
            }
          }
        ]
      });

      await alert.present();

      alert.onDidDismiss().then(async () => {

        if (option) {

          const response = await this.apiCore.removeCertified(id);
          this.global.createAlert('Certificado removido com sucesso!');
          this.getAllCertifieds();
        }
      });

    } catch (error) {
      console.log(error);
      this.global.createAlert('Ocorreu um erro ao remover o certificado');
    }
  }

  selectBanner(event) {
    this.certifiedForm.value.certified = event.target.files[0];
  }
}
