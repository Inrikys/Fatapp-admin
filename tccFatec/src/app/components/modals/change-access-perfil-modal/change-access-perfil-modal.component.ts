import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/api/user.service";
import { NavParams } from '@ionic/angular';
import {ChangeAccessPerfilService} from "../../../services/validators/chenge-access-perfil/change-access-perfil.service";

@Component({
  selector: 'app-change-access-perfil-modal',
  templateUrl: './change-access-perfil-modal.component.html',
  styleUrls: ['./change-access-perfil-modal.component.scss'],
})
export class ChangeAccessPerfilModalComponent implements OnInit {

  passedUser;
  changeAccessPerfilForm;
  validationMessages;

  constructor(
    private changeAccessPerfilValidator: ChangeAccessPerfilService,
    private userService: UserService,
    private navParams: NavParams
    ) { }

  ngOnInit() {
    this.passedUser = this.navParams.get('user');
    this.changeAccessPerfilForm = this.changeAccessPerfilValidator.getChangeAccessPerfilForm();
    this.validationMessages = this.changeAccessPerfilValidator.getChangeAccessPerfilValidationsMessages()
  }

  async register() {
    if (!this.changeAccessPerfilForm.valid) {
        this.changeAccessPerfilValidator.validateAllFormFields();
    } else {
        // await this.userService.updateData(this.changeAccessPerfilForm.value);
        console.log(this.changeAccessPerfilForm);
    }
}

}
