import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/api/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {

    public loginForm: FormGroup;

    constructor(
        private userService: UserService,
    ) {
        this.createForm();
    }

    private createForm() {
        this.loginForm = new FormGroup({
            // tslint:disable-next-line
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.required),
        });
    }
    submit(){
        console.log(this.loginForm);
        const data = {
            email: this.loginForm.get('email').value,
            senha: this.loginForm.get('password').value,
        };
        console.log(data);
        this.userService.autenticate(data).subscribe(data => {
            console.log(data);
        });
    }
}
