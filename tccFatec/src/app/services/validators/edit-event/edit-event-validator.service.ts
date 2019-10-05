import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class EditEventValidatorService {
  formEvent: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
  ) {
  }

  getFormEvent() {
    return this.createForm();
  }


  createForm() {
    return this.formEvent = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      edition: [null, Validators.compose([Validators.required])],
      initialDate: [null, Validators.compose([Validators.required])],
      finalDate: [null, Validators.compose([Validators.required])],
      banner: [null, Validators.compose([Validators.required])],
    });
  }

  validateAllFormFields() {
    Object.keys(this.formEvent.controls).forEach(field => {
      this.formEvent.get(field).markAsTouched({onlySelf: true});
    });
  }

  getFormEventValidationsMessages() {
    return {
      title: [
        {type: 'required', message: 'Título obrigatório'},
      ],
      edition: [
        {type: 'required', message: 'Edição obrigatória'},
      ],
      initialDate: [
        {type: 'required', message: 'Data obrigatória'},
      ],
      finalDate: [
        {type: 'required', message: 'Data obrigatória'},
      ],
      banner: [
        {type: 'required', message: 'Imagem obrigatória'},
      ],
    };
  }
}

