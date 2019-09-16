import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from '../components/modals/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private modalController: ModalController,
    private router: Router,
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.storage.get('user_storage');
    if (!user) {
      const modal = await this.modalController.create({
        component: LoginModalComponent,
      });
      modal.present();
      await this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }

  }

}
