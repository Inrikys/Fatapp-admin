import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/user-interface';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { GlobalsService } from '../globals.service';

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
        try {
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
            });
        } catch (error) {
            console.log(error);
        }
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

    async register(data: any) {
        try {
            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            const link = environment.apiUrl + 'usuario/registrar';
            return this.http.post(link, JSON.stringify(data), this.httpOptions).toPromise().catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateData(data) {
        try {
            let user;
            await this.storage.get('user_storage').then((res) => {
                user = res;
                this.httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'x-access-token': `${user.token}`,
                    })
                };
            });

            const link = environment.apiUrl + 'usuario/' + user.usuario._id;
            console.log(link);
            console.log(data);

            return this.http.put(link, JSON.stringify(data), this.httpOptions).toPromise().catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getAllUsers() {
        try {
            let user;
            await this.storage.get('user_storage').then((res) => {
                user = res;
                this.httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'x-access-token': `${user.token}`,
                    })
                };
            });
            const link = environment.apiUrl + 'usuario/';
            return this.http.get(link, this.httpOptions).toPromise().catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }
}
