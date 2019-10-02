import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegisterActivityModalComponent } from 'src/app/components/modals/register-activity-modal/register-activity-modal.component';

@Component({
  selector: 'app-calendar-of-events',
  templateUrl: './calendar-of-events.page.html',
  styleUrls: ['./calendar-of-events.page.scss'],
})
export class CalendarOfEventsPage implements OnInit {

  constructor(
    private global: GlobalsService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async goToQrCode(id) {
    try {
      this.global.navigateByUrl('admin/qr-code?id=' + id);
    } catch (error) {
      console.log(error);
    }
  }

  async goToRegisterActivity() {
    const modal = await this.modalController.create({
      component: RegisterActivityModalComponent,
    });
    await modal.present();
  }
}
