import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ChangeAccessPerfilModalComponent} from "../../components/modals/change-access-perfil-modal/change-access-perfil-modal.component";
import {UserService} from "../../services/api/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GlobalsService} from "../../services/globals.service";


@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.page.html',
  styleUrls: ['./access-control.page.scss'],
})

export class AccessControlPage implements OnInit, AfterViewInit{
  
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private global: GlobalsService,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.getAllUsers();
  }

  private users: any;
  private userSearch: any;
  public accessControlForm: FormGroup;

  private createForm() {
    this.accessControlForm = this.formBuilder.group({
      cpf: this.formBuilder.control(''),
      name: this.formBuilder.control(''),
    })
  }

  async getUserSearch() {
    if ((this.accessControlForm.get('name').value !== '') && (this.accessControlForm.get('cpf').value !== '') ) {
      this.userSearch = await this.users.filter(collection => {
        return collection.cpf === this.accessControlForm.get('cpf').value && collection.name.toLowerCase() + ' ' +  collection.last_name.toLowerCase() === this.accessControlForm.get('name').value.toLowerCase();
      });
      if (this.userSearch.length === 0){
        await this.global.createAlert('CPF e Nome incompatíveis')
      }
    } else if ((this.accessControlForm.get('name').value === '') && (this.accessControlForm.get('cpf').value !== '')){
      this.userSearch = await this.users.filter(collection => {
        return collection.cpf === this.accessControlForm.get('cpf').value;
      });
      if (this.userSearch.length === 0){
        await this.global.createAlert('CPF não encontrado')
      }
    }else if ((this.accessControlForm.get('cpf').value === '') && (this.accessControlForm.get('name').value !== '')){
      this.userSearch = await this.users.filter(collection => {
        return collection.name.toLowerCase() + ' ' +  collection.last_name.toLowerCase() === this.accessControlForm.get('name').value.toLowerCase();
      });
      if (this.userSearch.length === 0){
        await this.global.createAlert('Nome não encontrado')
      }
    } else if ((this.accessControlForm.get('name').value === '') && (this.accessControlForm.get('cpf').value === '')) {
      this.getAllUsers();
    }
  }

  getAllUsers(){
    this.userService.getAllUsers().then( data => {
      this.users = data;
      this.userSearch = null;
    }).catch(error => {
      console.log(error);
    })
  }

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
