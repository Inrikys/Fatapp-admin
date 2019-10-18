import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivitiesComponent } from 'src/app/components/modals/activities/activities.component';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async openActivitiesModal() {
    const modal = await this.modalController.create({
      component: ActivitiesComponent,
    });
    modal.present();

    modal.onDidDismiss()
      .then(async (data: any) => {
        if (data.data) {
          console.log(data.data);
        }
      });
  }

}
