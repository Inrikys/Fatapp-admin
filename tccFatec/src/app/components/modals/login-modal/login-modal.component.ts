import {Component} from '@angular/core';
import {UserService} from '../../../services/api/user.service';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {

    public loginForm: FormGroup;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
    ) {
        this.createForm();
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            email: this.formBuilder.control(''),
            password: this.formBuilder.control(''),
        })
    }

    submit() {
        console.log(this.loginForm);
        const data = {
            email: this.loginForm.get('email').value,
            senha: this.loginForm.get('password').value,
        };

        this.userService.autenticate(data);
    }
}
