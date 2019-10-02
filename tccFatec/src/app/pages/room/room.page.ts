import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddRoomModalComponent } from '../../components/modals/add-room-modal/add-room-modal.component';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage {

  private rooms: any = null;
  private roomsSearch: any = null;

  constructor(
    private modalController: ModalController,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
  ) {
  }

  async ionViewDidEnter() {
    await this.getAllRooms();
  }

  async goToAddRoomModal() {
    const modal = await this.modalController.create({
      component: AddRoomModalComponent,
    });
    await modal.present();
    await modal.onDidDismiss().then(() => {
      this.getAllRooms();
    });
  }

  async getAllRooms() {
    try {
      const loading = await this.global.createLoading('Aguarde...');
      await loading.present();
      const response = await this.apiCore.getAllRooms();
      this.rooms = response;
      console.log(response);
      await this.getResourcesRoom();
      await loading.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async getResourcesRoom() {
    try {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.rooms.length; i++) {
        let resources: any = await this.apiCore.getResourceRoom(this.rooms[i].id);
        let objResources = {
          resources,
        };
        Object.assign(this.rooms[i], objResources);
      }
    } catch (error) {
      console.log(error);
    }
  }

  filterRoom(type) {
    try {
      this.roomsSearch = [];
      const roomsToFilter = this.rooms;

      const keyword = type;

      this.roomsSearch = roomsToFilter.filter(collection => {

        return collection.type.toLowerCase().indexOf(keyword.toLowerCase()) > -1;

      });

    } catch (error) {
      console.log(error);
    }
  }

  goToEditRoom(id) {
    this.global.navigateByUrl('admin/edit-room?id=' + id);
  }

  goToCalendar() {
    this.global.navigateByUrl('admin/calendar-of-events');
  }
}
