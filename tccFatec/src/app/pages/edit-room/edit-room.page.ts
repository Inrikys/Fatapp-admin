import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddResourcesModalComponent } from 'src/app/components/modals/add-resources/add-resources-modal.component';
import { RegisterResourceModalComponent } from 'src/app/components/modals/register-resource/register-resource-modal.component';



@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.page.html',
  styleUrls: ['./edit-room.page.scss'],
})
export class EditRoomPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async goToRegisterResource() {
    const modal = await this.modalController.create({
      component: RegisterResourceModalComponent,
    });
    modal.present();
  }

  async goToAddResource() {
    const modal = await this.modalController.create({
      component: AddResourcesModalComponent,
    });
    modal.present();
  }
}
