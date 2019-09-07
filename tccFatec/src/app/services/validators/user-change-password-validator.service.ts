import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class UserChangePasswordValidatorService {
  changePasswordForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
  ) {
  }

    // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
    static areEqual(formGroup: FormGroup) {
        let val;
        let valid = true;

        for (let key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                let control: FormControl = <FormControl>formGroup.controls[key];
                if (val === undefined) {
                    val = control.value
                } else {
                    if (val !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        }
    }

  getChangePasswordForm() {
    return this.createForm();
  }

  createForm() {
    return this.changePasswordForm = this.formBuilder.group({
        password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        confirmPassword: [null, Validators.compose([Validators.required, this.checkPasswords()])],
    });
  }

  validateAllFormFields() {
    Object.keys(this.changePasswordForm.controls).forEach(field => {
        this.changePasswordForm.get(field).markAsTouched({onlySelf: true});
    });
  }

  getValidationsMessages() {
    return {
        password: [
            {type: 'required', message: 'Preencha o campo senha'},
            {type: 'minlength', message: 'Senha com no mínimo 8 caracteres'}
        ],
        confirmPassword: [
            {type: 'required', message: 'Preencha o campo confirmação de senha'},
        ]
    }
}
}
