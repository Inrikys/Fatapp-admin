import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChangeAccessPerfilModalComponent } from '../../components/modals/change-access-perfil-modal/change-access-perfil-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../../services/globals.service';
import { UsersService } from 'src/app/services/firebase/users/users.service';


@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.page.html',
  styleUrls: ['./access-control.page.scss'],
})

export class AccessControlPage implements AfterViewInit {

  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private global: GlobalsService,
  ) {
    this.createForm();
  }

  private users = new Array();
  private userSearch = new Array();
  public accessControlForm: FormGroup;


  ngAfterViewInit() {
    this.getUsers();
  }

  private createForm() {
    this.accessControlForm = this.formBuilder.group({
      cpf: this.formBuilder.control(''),
      name: this.formBuilder.control(''),
    });
  }

  getUsers() {
    let i = 0;
    this.usersService.getUsers().then(snapshot => {
      snapshot.forEach(value => {
        this.users[i] = value.val();
        i++;
      });
      console.log(this.users);
    }).catch(error => {
      console.log(error);
      this.global.createAlert(error);
    });
  }

  getUserSearch() {

  }

  // async getUserSearch() {
  //   if ((this.accessControlForm.get('name').value !== '') && (this.accessControlForm.get('cpf').value !== '')) {
  //     this.userSearch = await this.users.filter(collection => {
  //       return collection.cpf === this.accessControlForm.get('cpf').value && collection.name.toLowerCase() + ' ' + collection.last_name.toLowerCase() === this.accessControlForm.get('name').value.toLowerCase();
  //     });
  //     if (this.userSearch.length === 0) {
  //       await this.global.createAlert('CPF e Nome incompatíveis')
  //     }
  //   } else if ((this.accessControlForm.get('name').value === '') && (this.accessControlForm.get('cpf').value !== '')) {
  //     this.userSearch = await this.users.filter(collection => {
  //       return collection.cpf === this.accessControlForm.get('cpf').value;
  //     });
  //     if (this.userSearch.length === 0) {
  //       await this.global.createAlert('CPF não encontrado')
  //     }
  //   } else if ((this.accessControlForm.get('cpf').value === '') && (this.accessControlForm.get('name').value !== '')) {
  //     this.userSearch = await this.users.filter(collection => {
  //       return collection.name.toLowerCase() + ' ' + collection.last_name.toLowerCase() === this.accessControlForm.get('name').value.toLowerCase();
  //     });
  //     if (this.userSearch.length === 0) {
  //       await this.global.createAlert('Nome não encontrado')
  //     }
  //   } else if ((this.accessControlForm.get('name').value === '') && (this.accessControlForm.get('cpf').value === '')) {
  //     this.getAllUsers();
  //   }
  // }

  async goToChangePerfilModal(passedUser) {
    const modal = await this.modalController.create({
      component: ChangeAccessPerfilModalComponent,
      componentProps: {
        user: passedUser
      }
    });
    modal.present();
  }

}
