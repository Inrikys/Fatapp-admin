import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ChangeAccessPerfilModalComponent} from "../../components/modals/change-access-perfil-modal/change-access-perfil-modal.component";

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.page.html',
  styleUrls: ['./access-control.page.scss'],
})

export class AccessControlPage implements OnInit{
  
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {    
  }

  rows = [
    {
      "name": "Ethel",
      "last_name": "Price",
      "cpf": "666.666.666-66",
      "email": "ethelefonecasa@hotmail.com",
      "user_type": "Docente"
    },
    {
      "name": "Comedra",
      "last_name": "Honey",
      "cpf": "777.777.777-77",
      "email": "comedrahoney@fatec.com",
      "user_type": "Secretaria"
    },
    {
      "name": "Michel",
      "last_name": "Angelo",
      "cpf": "444.444.444-44",
      "email": "michelan@gmail.com",
      "user_type": "Coordenação"
    },
  ];
 
  async goToChangePerfilModal(obj){
    const modal = await this.modalController.create({
      component: ChangeAccessPerfilModalComponent,
      componentProps: {
        user: obj
      }
    });
    modal.present();
  }
 
}
