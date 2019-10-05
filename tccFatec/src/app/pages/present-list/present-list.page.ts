import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SendEmailModalComponent } from 'src/app/components/modals/send-email/send-email-modal.component';

@Component({
  selector: 'app-present-list',
  templateUrl: './present-list.page.html',
  styleUrls: ['./present-list.page.scss'],
})
export class PresentListPage {

  public presentListForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
  ) {
    this.createForm();
  }

  private createForm() {
    this.presentListForm = this.formBuilder.group({
      date_start: this.formBuilder.control(''),
      date_end: this.formBuilder.control(''),
    });
  }

  async goToSendEmail() {
    const modal = await this.modalController.create({
      component: SendEmailModalComponent,
    });

    await modal.present();

  }

}
