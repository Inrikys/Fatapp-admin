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
      speakerEmail: [null, Validators.compose([Validators.required])],
      eventTitle: [null, Validators.compose([Validators.required])],
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
      speakerEmail: [
        { type: 'required', message: 'Email obrigatório' },
      ],
      eventTitle: [
        { type: 'required', message: 'Título obrigatório' },
      ],
      title: [
        { type: 'required', message: 'Título obrigatório' },
      ],
      type: [
        { type: 'required', message: 'Tipo obrigatório' },
      ],
      targetAudience: [
        { type: 'required', message: 'Público-alvo obrigatório' },
      ],
      initialTime: [
        { type: 'required', message: 'Data obrigatória' },
      ],
      finalTime: [
        { type: 'required', message: 'Data obrigatória' },
      ],
      description: [
        { type: 'required', message: 'Descrição obrigatória' },
      ],
    };
  }
}
