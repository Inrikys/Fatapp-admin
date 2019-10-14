import { Component } from '@angular/core';
import { EditSpeakerValidatorService } from 'src/app/services/validators/edit-speaker/edit-speaker-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SpeakersComponent } from 'src/app/components/modals/speakers/speakers.component';

@Component({
  selector: 'app-edit-speaker',
  templateUrl: './edit-speaker.page.html',
  styleUrls: ['./edit-speaker.page.scss'],
})
export class EditSpeakerPage {

  public nameSpeaker = '';
  public phoneSpeaker = '';
  public phone2Speaker = '';
  public curriculumSpeaker = '';
  public emailSpeaker = '';
  public passedSpeaker = null;
  public editSpeakerForm;
  public validationMessages;

  public speakers = null;
  public speakerSearch = new Array();

  constructor(
    private editSpeakerValidator: EditSpeakerValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
  ) {
    this.editSpeakerForm = this.editSpeakerValidator.getEditSpeakerForm();
    this.validationMessages = this.editSpeakerValidator.getEditSpeakerFormValidationsMessages();
  }

  async ionViewDidEnter() {
    await this.getSpeakers();
  }

  async submit() {
    try {
      if (!this.editSpeakerForm.valid) {
        this.editSpeakerValidator.validateAllFormFields();
      } else {
        const response: any = await this.apiCore.updateSpeaker(this.editSpeakerForm.value);
        this.global.createAlert('Palestrante alterado com sucesso!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getSpeakers() {
    try {
      const loading = await this.global.createLoading('Carregando...');
      await loading.present();
      this.speakers = await this.apiCore.getAllSpeakers();
      await loading.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  removeDisable() {
    const elements = document.querySelectorAll(`.edit-form`);

    // @ts-ignore
    for (const item of elements) {
      item.removeAttribute('disabled');
    }
  }
  setDisable() {
    const elements = document.querySelectorAll(`.edit-form`);

    // @ts-ignore
    for (const item of elements) {
      item.setAtribute('disabled');
    }
  }

  async removeSpeaker(id) {
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
          const response = await this.apiCore.removeSpeaker(id);
          console.log(response);
          await this.global.createToast('Palestrante removido com sucesso!');
          await this.getSpeakers();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async openSpeakersModal() {
    const modal = await this.modalController.create({
      component: SpeakersComponent,
    });
    modal.present();

    modal.onDidDismiss()
      .then(async (data: any) => {
        if (data.data) {
          this.passedSpeaker = data.data;
          this.emailSpeaker = await this.passedSpeaker.speakerEmail;
          this.nameSpeaker = await this.passedSpeaker.speakerName;
          this.phoneSpeaker = await this.passedSpeaker.speakerPhone;
          this.phone2Speaker = await this.passedSpeaker.speakerPhone2;
          this.curriculumSpeaker = await this.passedSpeaker.speakerCurriculum;
          this.removeDisable();
          console.log(this.passedSpeaker);
        }
      });
  }

  resetInputs() {
    this.editSpeakerForm.reset();
  }
}
