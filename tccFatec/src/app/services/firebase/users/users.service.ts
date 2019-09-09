import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/interfaces/user-interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { GlobalsService } from '../../globals.service';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(
    private afAuth: AngularFireAuth,
    private angularFireDb: AngularFireDatabase,
    private global: GlobalsService,
    private storage: Storage,
    private modalController: ModalController,
  ) {
    this.load();
  }


  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  load() {
    this.storage.get('user_storage').then((data) => {
      this.user.next(data);
    });
  }

  async setData(data) {
    await this.storage.set('user_storage', data);
    this.user.next(data);
    console.log(await this.storage.get('user_storage'));
  }


  register(data: User) {
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
          image: `https://ui-avatars.com/api/?name=${data.name}+${data.last_name}&?background=#808080&color=f5f5f5`,
          user_type: data.user_type,
          created_at: dateTime,
        };
        return this.angularFireDb.database.ref(`usersProfile/${uid}`).set(userObj).then(() => {
          this.global.createAlert('Usuário criado com sucesso!');
        }).catch(error => {
          console.log(error);
        });

      }).catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          this.global.createAlert('E-mail já está sendo usado');
        } else if (error.code === 'auth/invalid-email') {
          this.global.createAlert('E-mail inválido');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  login(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password).then((user) => {
      const uid = user.user.uid;
      this.angularFireDb.database.ref(`usersProfile/${uid}`).once('value').then(snapshot => {
        this.setData(snapshot.val());
        this.modalController.dismiss();
      });


    }).catch(error => {
      if (error.code === 'auth/invalid-email') {
        this.global.createAlert('E-mail inválido');
      } else if (error.code === 'auth/user-not-found') {
        this.global.createAlert('Usuário não encontrado ');
      } else if (error.code === 'auth/wrong-password') {
        this.global.createAlert('Senha incorreta');
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.storage.remove('user_storage').then((data) => {
        this.user.next(data);
      });
    }).catch(error => {
      this.global.createAlert(error);
    });
  }

  getUsers() {
    return this.angularFireDb.database.ref(`usersProfile/`).once('value');
  }

  getUser(uid) {
    return this.angularFireDb.database.ref(`usersProfile/`).once('value');
  }

  updateAccessUser(profile, accessUser: any) {
    const uid = accessUser.uid;
    this.angularFireDb.database.ref('usersProfile/').child(`${uid}`).update(profile).then(() => {
      this.angularFireDb.database.ref(`usersProfile/${uid}`).once('value').then(snapshot => {
        this.global.createToast('Dados atualizados!');
        this.modalController.dismiss();
      });
    }).catch(error => {
      console.log(error);
      this.global.createToast(error);
    });

  }

  async updateUser(data) {
    const uid = this.user.value.uid;
    const response: any = this.updateEmail(data.email);
    console.log(response);

    if (!response) {
      this.global.createToast('Erro ao atualizar dados!');
    } else {
      this.angularFireDb.database.ref('usersProfile/').child(`${uid}`).update(data).then(() => {
        this.angularFireDb.database.ref(`usersProfile/${uid}`).once('value').then(snapshot => {
          this.setData(snapshot.val());
          this.global.createToast('Dados atualizados!');
          this.modalController.dismiss();
        });
      }).catch(error => {
        console.log(error);
        this.global.createToast(error);
      });
    }
  }

  updateEmail(newEmail) {
    const response = this.afAuth.auth.currentUser.updateEmail(newEmail).then(() => {
      console.log('E-mail atualizado!');
      return true;
    }).catch(error => {
      console.log(error);
      if (error.code) {
        this.global.createAlert('Erro ao atualizar dados, por favor, reinicie sua sessão e tente novamente');
      } else {
        this.global.createAlert('Erro ao atualizar dados');
      }
      return false;
    });
    return response;
  }

  updatePassword(newPassword) {
    const response = this.afAuth.auth.currentUser.updatePassword(newPassword).then(() => {
      console.log('Senha atualizada!');
      return true;
    }).catch(error => {
      console.log(error);
      if (error.code) {
        this.global.createAlert('Erro ao atualizar dados, por favor, reinicie sua sessão e tente novamente');
      } else {
        this.global.createAlert('Erro ao atualizar dados');
      }
      return false;
    });
    return response;
  }

  forgetPassword(email) {
    const response = this.afAuth.auth.sendPasswordResetEmail(`${email.email}`).then(() => {
      this.global.createAlert('Solicitação para redefinir senha foi enviada ao seu e-mail');
    });
  }

}
