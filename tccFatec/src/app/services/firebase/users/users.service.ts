import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/interfaces/user-interface';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private afAuth: AngularFireAuth,
    private angularFireDb: AngularFireDatabase,
  ) { }

  async register(data: User) {
    try {
      return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then(newUser => {
        const uid = newUser.user.uid;
        const dateTime = Date();
        const userObj = {
          uid,
          name: data.name,
          last_name: data.last_name,
          email: data.email,
          cpf: data.cpf,
          image: '',
          user_type: data.user_type,
          created_at: dateTime,
        };
        return this.angularFireDb.database.ref(`usersProfile/${uid}`).set(userObj).catch(error => {
          console.log(error);
        });

      }).catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }


}
