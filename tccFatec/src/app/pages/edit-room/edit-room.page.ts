import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AddResourcesModalComponent } from 'src/app/components/modals/add-resources/add-resources-modal.component';
import { RegisterResourceModalComponent } from 'src/app/components/modals/register-resource/register-resource-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';



@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.page.html',
  styleUrls: ['./edit-room.page.scss'],
})
export class EditRoomPage {

  private room: any = null;
  private roomId: any = null;
  private resourcesRoom: any = null;

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private global: GlobalsService,
    private apiCore: FatappCoreService,
    private router: Router,
    private alertController: AlertController,
  ) {
  }

  ionViewDidEnter() {
    this.getRoom();
  }

  async getRoom() {
    try {
      if (this.route.snapshot.queryParams.id) {
        this.roomId = await this.route.snapshot.queryParams.id;
        const response = await this.apiCore.getRoomById(this.roomId);
        this.room = response;
        await this.getResourcesRoom();
      } else {
        console.log('Parametro inválido!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeRoom() {
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
          await this.apiCore.removeRoom(this.roomId);
          await this.global.createToast('Sala removida!');
          await this.router.navigate(['admin/room']);
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  async getResourcesRoom() {
    try {
      const response = await this.apiCore.getResourceRoom(this.roomId);
      this.resourcesRoom = response;
    } catch (error) {
      console.log(error);
    }
  }

  async removeResourceRoom(resourceId) {
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
          const response = await this.apiCore.removeResourceRoom(this.roomId, resourceId);
          if (response) {
            this.global.createToast('Recurso removido da sala!');
            this.getResourcesRoom();
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  async goToRegisterResource() {
    const modal = await this.modalController.create({
      component: RegisterResourceModalComponent,
    });
    modal.present();
    modal.onDidDismiss().then(() => {
      this.getResourcesRoom();
    });

  }

  async goToAddResource() {
    const modal = await this.modalController.create({
      component: AddResourcesModalComponent,
      componentProps: {
        roomId: this.roomId,
      }
    });
    modal.present();
    modal.onDidDismiss().then(() => {
      this.getResourcesRoom();
    });
  }

  goBack() {
    this.global.navigateByUrl('admin/room');
  }
}
