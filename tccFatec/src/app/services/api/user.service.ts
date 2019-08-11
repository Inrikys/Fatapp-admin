import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from "rxjs";
import {User} from "../../interfaces/user-interface";
import {ModalController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private modalController: ModalController,
    ) {
        this.load();
    }

    public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

     async autenticate(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let api_url = 'https://myspotapp-1541881215537.appspot.com/api/',
            link = api_url + 'usuario/autenticar';

        await this.http.post(link, JSON.stringify(data), httpOptions).subscribe( async data => {
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
    logout(){
        this.storage.remove('user_storage').then((data)=>{
            this.user.next(data);
        });
    }
    setData(data): void {
        void this.storage.set('user_storage', data);
        this.user.next(data);
    }
}
