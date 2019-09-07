import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from "rxjs";
import {User} from "../../interfaces/user-interface";
import {ModalController} from "@ionic/angular";
import {environment} from "../../../environments/environment";
import {GlobalsService} from "../globals.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private httpOptions: any;

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private modalController: ModalController,
        private global: GlobalsService,
    ) {
        this.load();
    }

    public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    async autenticate(data) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        const link = environment.apiUrl + 'usuario/autenticar';

        await this.http.post(link, JSON.stringify(data), this.httpOptions).subscribe(async data => {
            await this.setData(data);
            await this.modalController.dismiss();
            console.log(data);
        })
    }

    load() {
        this.storage.get('user_storage').then((data) => {
            this.user.next(data);
        });
    }

    logout() {
        this.storage.remove('user_storage').then((data) => {
            this.user.next(data);
        });
    }

    setData(data): void {
        void this.storage.set('user_storage', data);
        this.user.next(data);
    }

    async register(data) {
        const loading = await this.global.createLoading('Por favor, aguarde...');
        const link = environment.apiUrl + 'usuario/registrar';
        this.http.post(link, JSON.stringify(data), this.httpOptions).subscribe(async data => {
            loading.dismiss();
            console.log(data);
            await this.global.createAlert('Usuário cadastrado com sucesso!');
        }, async error => {
            loading.dismiss();
            console.log(error);
            await this.global.createAlert('Erro ao cadastrar usuário!');
        });
    }

    async updateData(data) {
        let user;
        await this.storage.get('user_storage').then( (res) => {
            user = res;
            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': `${user.token}`,
                })
            };
        });

        const link = environment.apiUrl + 'usuario/' + user.usuario._id;

        await this.http.put(link, JSON.stringify(data), this.httpOptions).subscribe(async data => {
            await this.setData(data);
            await this.modalController.dismiss();
            console.log(data);
        })
    }

    async changePassword(data){
        let user;
        await this.storage.get('user_storage').then( (res) => {
            user = res;
            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': `${user.token}`,
                })
            };
        });

        const link = environment.apiUrl + 'usuario/novaSenha/' + user.usuario._id;

        await this.http.put(link, JSON.stringify(data), this.httpOptions).subscribe(async data => {
            await this.setData(data);
            await this.modalController.dismiss();
            console.log(data);
        })
    }

    async getAllUsers(){
        let user;
        await this.storage.get('user_storage').then( (res) => {
            user = res;
            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': `${user.token}`,
                })
            };
        });
        const link = environment.apiUrl + 'usuario/';
        return this.http.get(link, this.httpOptions).toPromise();
    }
}
