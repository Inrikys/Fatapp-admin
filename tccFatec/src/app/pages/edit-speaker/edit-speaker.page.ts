import { Component } from '@angular/core';
import { EditSpeakerValidatorService } from 'src/app/services/validators/edit-speaker/edit-speaker-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  public editSpeakerForm;
  public validationMessages;

  public speakers = null;
  public speakerSearch = new Array();
  public speakerSearchForm: FormGroup;

  constructor(
    private editSpeakerValidator: EditSpeakerValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
  ) {
    this.editSpeakerForm = this.editSpeakerValidator.getEditSpeakerForm();
    this.validationMessages = this.editSpeakerValidator.getEditSpeakerFormValidationsMessages();
    this.createForm();
  }

  async ionViewDidEnter() {
    await this.getSpeakers();
  }

  private createForm() {
    this.speakerSearchForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
    });
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

  async selectSpeaker(email) {
    try {
      console.log(email);
      const response: any = await this.apiCore.getSpeaker(email);
      console.log(response);
      this.emailSpeaker = await response.speakerEmail;
      this.nameSpeaker = await response.speakerName;
      this.phoneSpeaker = await response.speakerPhone;
      this.phone2Speaker = await response.speakerPhone2;
      this.curriculumSpeaker = await response.speakerCurriculum;
      this.removeDisable();
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

        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getSpeakersSearch() {
    try {
      this.speakerSearch = [];
      const speakersToFilter = this.speakers;

      const keyword = this.speakerSearchForm.value.name;
      console.log(keyword);

      this.speakerSearch = speakersToFilter.filter(collection => {
        console.log(collection);
        return collection.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });

    } catch (error) {
      console.log(error);
    }
  }

}
