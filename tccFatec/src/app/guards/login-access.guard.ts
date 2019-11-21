import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoginModalComponent } from '../components/modals/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LoginAccessGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private modalController: ModalController,
    private router: Router,
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.storage.get('user_storage');
    if (user) {
      if (user.user_type === 'Administrador' || user.user_type === 'Comum') {
        return true;
      } else {
        const modal = await this.modalController.create({
          component: LoginModalComponent,
        });
        modal.present();
        await this.router.navigate(['home']);
        return false;
      }
    } else {
      const modal = await this.modalController.create({
        component: LoginModalComponent,
      });
      modal.present();
      await this.router.navigate(['home']);
      return false;
    }

  }

}
