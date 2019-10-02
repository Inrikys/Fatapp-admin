import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class RegisterActivityValidatorService {
  activityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  getActivityForm() {
    return this.createForm();
  }


  createForm() {
    return this.activityForm = this.formBuilder.group({
      speakerName: [null, Validators.compose([Validators.required])],
      speakerEmail: [null, Validators.compose([Validators.required, Validators.email])],
      speakerPhone: [null, Validators.compose([Validators.required])],
      speakerCurriculum: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      type: [false, Validators.compose([Validators.required])],
      targetAudience: [null, Validators.compose([Validators.required])],
      initialTime: [null, Validators.compose([Validators.required])],
      finalTime: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
    });
  }

  validateAllFormFields() {
    Object.keys(this.activityForm.controls).forEach(field => {
      this.activityForm.get(field).markAsTouched({ onlySelf: true });
    });
  }

  getActivityFormValidationsMessages() {
    return {
      speakerName: [
        { type: 'required', message: 'Nome obrigatório' },
      ],
      speakerEmail: [
        { type: 'required', message: 'Email obrigatório' },
        { type: 'email', message: 'Endereço de email inválido' },
      ],
      speakerPhone: [
        { type: 'required', message: 'Número obrigatório' },
      ],
      speakerCurriculum: [
        { type: 'required', message: 'Currículo obrigatório' },
      ],
      title: [
        { type: 'required', message: 'Título obrigatório' },
      ],
      type: [
        { type: 'required', message: 'Tipo obrigatório' },
      ],
      targetAudience: [
        { type: 'required', message: 'Público alvo obrigatório' },
      ],
      initialTime: [
        { type: 'required', message: 'Hora obrigatória' },
      ],
      finalTime: [
        { type: 'required', message: 'Hora obrigatória' },
      ],
      description: [
        { type: 'required', message: 'Descrição obrigatória' },
      ],
    };
  }
}
