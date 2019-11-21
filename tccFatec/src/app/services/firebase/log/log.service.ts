import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private user;

  constructor(
    private angularFireDb: AngularFireDatabase,
    private storage: Storage,
  ) {
    this.initialize();
  }

  async initialize() {
    this.user = await this.storage.get('user_storage');
    console.log(this.user);
  }

  createLog(action) {
    const dateTime = Date();
    const userObj = {
      name: this.user.name,
      last_name: this.user.last_name,
      email: this.user.email,
      cpf: this.user.cpf,
      user_type: this.user.user_type,
      log_date: dateTime,
    };
    this.angularFireDb.database.ref(`log/${this.user.cpf}`).set(userObj).then(() => {
      this.angularFireDb.database.ref(`log/${this.user.cpf}/action`).set(action).then(() => {
        console.log('log criado');
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  }

}
