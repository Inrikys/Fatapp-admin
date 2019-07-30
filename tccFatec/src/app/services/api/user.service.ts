import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient,
    ) {
    }

    autenticate(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let api_url = 'https://myspotapp-1541881215537.appspot.com/api/',
            link = api_url + 'usuario/autenticar';
        return this.http.post(link, JSON.stringify(data), httpOptions);
    }
}
