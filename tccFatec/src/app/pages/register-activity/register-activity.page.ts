import { Component } from '@angular/core';
import { RegisterActivityValidatorService } from 'src/app/services/validators/register-activity/register-activity-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { ModalController } from '@ionic/angular';
import { SpeakersComponent } from 'src/app/components/modals/speakers/speakers.component';
import { EventsComponent } from 'src/app/components/modals/events/events.component';
import { ToolsService } from 'src/app/services/tools/tools.service';

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
  public targetAudience;

  constructor(
    private activityValidator: RegisterActivityValidatorService,
    private apiCore: FatappCoreService,
    private modalController: ModalController,
    private tools: ToolsService,
  ) {
    this.activityForm = this.activityValidator.getActivityForm();
    this.validationMessages = this.activityValidator.getActivityFormValidationsMessages();
    this.getTargetAudience();
  }

  submit() {
    try {
      if (!this.activityForm.valid) {
        this.activityValidator.validateAllFormFields();
      } else {
        console.log(this.activityForm.value);
        console.log(this.speaker);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getSpeaker() {

    console.log(this.activityForm.value.speakerEmail);
  }

  async getTargetAudience() {
    try {
      this.targetAudience = await this.apiCore.getAllCourses();
      console.log(this.targetAudience);
    } catch (error) {

    }
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
