import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      user_type: [null, Validators.compose([Validators.required])],
      cpf: [null, Validators.compose([Validators.required])],
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
      cpf: [
        {type: 'required', message: 'CPF obrigatório'},
      ],
      email: [
        {type: 'required', message: 'Email obrigatório'},
        {type: 'email', message: 'Endereço de email inválido'},
      ],
      password: [
        {type: 'required', message: 'Senha obrigatória'},
        {type: 'minlength', message: 'Senha com no mínimo 8 caracteres'}
      ]
    }
  }
}
