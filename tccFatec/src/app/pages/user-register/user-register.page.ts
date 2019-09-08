import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { UserRegisterValidatorService } from '../../services/validators/user-register-validator.service';
import { LoadingController } from '@ionic/angular';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.page.html',
    styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {

    public registerForm;
    public validationMessages;

    constructor(
        private userRegisterValidator: UserRegisterValidatorService,
        private userService: UserService,
        private loadingController: LoadingController,
        private global: GlobalsService,
    ) { }

    ngOnInit() {
        this.registerForm = this.userRegisterValidator.getRegistrationForm();
        this.validationMessages = this.userRegisterValidator.getRegistrationFormValidationsMessages();
    }


    async register() {
        if (!this.registerForm.valid) {
            this.userRegisterValidator.validateAllFormFields();
        } else {
            const loading = await this.loadingController.create({ message: 'Carregando...' });
            await loading.present();
            const registerResponse: any = await this.userService.register(this.registerForm.value);
            await loading.dismiss();
            console.log(registerResponse);
            if (!registerResponse) {
                this.global.createAlert('Erro ao cadastrar. E-mail ou CPF já existentes');
            } else {
                this.global.createAlert('Usuário cadastrado com sucesso!');
            }
        }
    }

}
