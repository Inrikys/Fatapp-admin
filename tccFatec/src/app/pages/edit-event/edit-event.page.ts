import { Component, OnInit } from '@angular/core';
import { EditEventValidatorService } from 'src/app/services/validators/edit-event/edit-event-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

  public formEvent;
  public validationMessages;


  constructor(
    private eventValidator: EditEventValidatorService,
    private apiCore: FatappCoreService,
  ) { }

  ngOnInit() {
    this.formEvent = this.eventValidator.getFormEvent();
    this.validationMessages = this.eventValidator.getFormEventValidationsMessages();
  }

  async upload() {
    if (!this.formEvent.valid) {
      this.eventValidator.validateAllFormFields();
    } else {
      this.apiCore.updateEvent(this.formEvent.value);
    }

  }

  async remove(id) {
    this.apiCore.removeEvent(id);
  }

}
