import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AddRoomModalComponent} from "../../components/modals/add-room-modal/add-room-modal.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  constructor(
      private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async goToAddRoomModal(){
    const modal = await this.modalController.create({
      component: AddRoomModalComponent,
    });
    modal.present();
  }

}
