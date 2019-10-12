import { Component } from '@angular/core';
import { RegisterActivityValidatorService } from 'src/app/services/validators/register-activity/register-activity-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { ModalController } from '@ionic/angular';
import { SpeakersComponent } from 'src/app/components/modals/speakers/speakers.component';
import { EventsComponent } from 'src/app/components/modals/events/events.component';

@Component({
  selector: 'app-register-activity',
  templateUrl: './register-activity.page.html',
  styleUrls: ['./register-activity.page.scss'],
})
export class RegisterActivityPage {

  public activityForm;
  public validationMessages;
  public speaker = null;
  public speakerEmail = '';
  public eventId = '';
  public eventTitle = '';

  constructor(
    private activityValidator: RegisterActivityValidatorService,
    private apiCore: FatappCoreService,
    private modalController: ModalController,
  ) {
    this.activityForm = this.activityValidator.getActivityForm();
    this.validationMessages = this.activityValidator.getActivityFormValidationsMessages();
  }

  submit() {
    console.log(this.activityForm);
    if (!this.activityForm.valid) {
      this.activityValidator.validateAllFormFields();
    } else {
      console.log(this.activityForm.value);
      console.log(this.speaker);
    }
  }

  getSpeaker() {

    console.log(this.activityForm.value.speakerEmail);
  }

  async openSpeakersModal() {
    const modal = await this.modalController.create({
      component: SpeakersComponent,
    });
    modal.present();

    modal.onDidDismiss()
      .then((data: any) => {
        if (data.data) {
          this.speaker = data.data;
          this.speakerEmail = this.speaker.speakerEmail;
          console.log(this.speakerEmail);
        }
      });
  }

  async openEventsModal() {
    const modal = await this.modalController.create({
      component: EventsComponent,
    });
    modal.present();

    modal.onDidDismiss()
      .then((data: any) => {
        if (data.data) {
          const response = data.data;
          this.eventTitle = response.title;
          this.eventId = response.id;
          console.log(this.eventId);
        }
      });
  }
}
