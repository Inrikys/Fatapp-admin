import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SendEmailModalComponent } from 'src/app/components/modals/send-email/send-email-modal.component';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-present-list',
  templateUrl: './present-list.page.html',
  styleUrls: ['./present-list.page.scss'],
})
export class PresentListPage {

  public activities = null;
  public activitySearchForm: FormGroup;
  public activitySearch = new Array();

  constructor(
    private tools: ToolsService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
  ) {
    this.createForm();
  }

  ionViewDidEnter() {
    this.getAllActivities();
  }

  async openSendEmailModal(activity) {
    const modal = await this.modalController.create({
      component: SendEmailModalComponent,
      componentProps: {
        activity,
      }
    });
    await modal.present();
  }



  private createForm() {
    this.activitySearchForm = this.formBuilder.group({
      date_start: this.formBuilder.control(''),
      date_end: this.formBuilder.control(''),
    });
  }

  async getAllActivities() {
    const loading = await this.global.createLoading('Carregando atividades...');
    await loading.present();
    this.activities = await this.apiCore.getAllActivity();
    if (this.activities) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.activities.length; i++) {
        this.tools.formatFrontTimeDate(this.activities[i].initialDate);
        let formatedInitialTime = this.tools.formatFrontDate(this.activities[i].initialDate);
        let formatedFinalTime = this.tools.formatFrontDate(this.activities[i].finalDate);
        let subscribers = await this.apiCore.getSubscriptions(this.activities[i].id);
        let obj = {
          formatedInitialTime,
          formatedFinalTime,
          subscribers,
        };
        Object.assign(this.activities[i], obj);
      }
    }
    console.log(this.activities);
    await loading.dismiss();
  }

  async goToActivityStudent(activityId) {
    try {
      this.global.navigateByUrl('admin/activity-student?id=' + activityId);
    } catch (error) {
      console.log(error);
    }
  }

  async getActivitySearch() {
    try {
      this.activitySearch = [];
      const activitiesToFilter = this.activities;

      const dateStart = this.activitySearchForm.value.date_start;
      const dateEnd = this.activitySearchForm.value.date_end;

      this.activitySearch = activitiesToFilter.filter(collection => {

        return collection.formatedInitialTime >= dateStart && collection.formatedInitialTime <= dateEnd;
      });
      console.log(this.activitySearch);

    } catch (error) {
      console.log(error);
    }
  }

}
