import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from "rxjs";
import {UserAuth} from "../../interfaces/user-auth-interface";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private http: HttpClient,
        private storage: Storage,
    ) {
        this.load();
    }

    public user_auth: BehaviorSubject<UserAuth> = new BehaviorSubject<UserAuth>(null);

    autenticate(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let api_url = 'https://myspotapp-1541881215537.appspot.com/api/',
            link = api_url + 'usuario/autenticar';

        this.http.post(link, JSON.stringify(data), httpOptions).subscribe( data => {
            this.setData(data);
            console.log(data);
        })
    }

    load() {
        this.storage.get('user_auth').then((data) => {
            this.user_auth.next(data);
        });
    }
    logout(){
        this.storage.remove('user_auth').then((data)=>{
            this.user_auth.next(data);
        });
        console.log('removeu');
    }
    setData(data): void {
        void this.storage.set('user_auth', data);
        this.user_auth.next(data);
    }
}
