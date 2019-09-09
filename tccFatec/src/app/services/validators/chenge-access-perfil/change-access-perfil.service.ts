import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChangeAccessPerfilService {
  changeAccessPerfilForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
  ) {
  }

  getChangeAccessPerfilForm() {
    return this.createForm();
  }


  createForm() {
    return this.changeAccessPerfilForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
      user_type: [null, Validators.compose([Validators.required])],
    });
  }

  validateAllFormFields() {
    Object.keys(this.changeAccessPerfilForm.controls).forEach(field => {
      this.changeAccessPerfilForm.get(field).markAsTouched({onlySelf: true});
    });
  }

  getChangeAccessPerfilValidationsMessages() {
    return {
      name: [
        {type: 'required', message: 'Nome obrigatório'},
      ],
      last_name: [
        {type: 'required', message: 'Sobrenome obrigatório'},
      ],
      user_type: [
        {type: 'required', message: 'Escolha o tipo de usuário'},
      ],
    };
  }
}
