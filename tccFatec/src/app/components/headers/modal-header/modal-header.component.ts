import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {

  constructor(
      private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss().then(() => {
      console.log('fechou');
    });
  }

}
