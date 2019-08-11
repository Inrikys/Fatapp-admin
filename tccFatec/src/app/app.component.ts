import {Component} from '@angular/core';

import {MenuController, ModalController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

// Modals
import {LoginModalComponent} from './components/modals/login-modal/login-modal.component';
import {AccountModalComponent} from "./components/modals/account-modal/account-modal.component";

//Interfaces
import {User} from "./interfaces/user-interface";
import {UserService} from "./services/api/user.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public userMenu = [
        {title: 'Home', url: '/home'},
        {title: 'Cadastrar usuário', url: '/admin/user-register'}
    ];
    public generalLinks = [
        {title: 'Sobre', url: '/about'},
        {title: 'Política de privacidade', url: '/privacy-policy'},
    ];

    private user: User = null;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menuController: MenuController,
        private modalController: ModalController,
        private userService: UserService,
    ) {
        this.initializeApp();
        this.initialize();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    initialize(){
        this.userService.user.subscribe(data => {
            this.user = data;
            console.log(this.user);
        })

    }

    menuClose() {
        this.menuController.close();
    }

    async goToLogin() {
        const loginModal = await this.modalController.create({
            component: LoginModalComponent,
        });
        loginModal.present();
    }

    async goToAccount(){
        const accountModal = await this.modalController.create({
            component: AccountModalComponent,
        });
        accountModal.present();
    }
}