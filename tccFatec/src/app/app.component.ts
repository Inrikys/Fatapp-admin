import {Component} from '@angular/core';

import {MenuController, ModalController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';

// Modals
import {LoginModalComponent} from './components/modals/login-modal/login-modal.component';
import {AccountModalComponent} from "./components/modals/account-modal/account-modal.component";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public userMenu = [
        {title: 'Home', url: '/home'},
    ];
    public generalLinks = [
        {title: 'Sobre', url: '/about'},
        {title: 'Política de privacidade', url: '/privacy-policy'},
    ];

    private userAuth: any = [];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menuController: MenuController,
        private modalController: ModalController,
        private storage: Storage,
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
        this.storage.get('user_auth').then( data => {
            this.userAuth = data;
            console.log(this.userAuth);
        });

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