import {Component} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { UsersService } from 'src/app/services/firebase/users/users.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {

    public loginForm: FormGroup;

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
    ) {
        this.createForm();
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            email: this.formBuilder.control(''),
            password: this.formBuilder.control(''),
        });
    }

    async submit() {
        console.log(this.loginForm);
        const data = {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value,
        };

        this.usersService.login(data);
    }
}
