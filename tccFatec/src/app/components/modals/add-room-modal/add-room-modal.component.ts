import { Component, OnInit } from '@angular/core';
import { AddRoomValidatorService } from '../../../services/validators/add-room/add-room-validator.service';

@Component({
  selector: 'app-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.scss'],
})
export class AddRoomModalComponent implements OnInit {
  formRoom;
  validationMessages;

  constructor(
    private addRoomValidator: AddRoomValidatorService,
  ) { }

  ngOnInit() {
    this.formRoom = this.addRoomValidator.getFormRoom();
    this.validationMessages = this.addRoomValidator.getFormRoomValidationsMessages();
  }

  async submit() {
    if (!this.formRoom.valid) {
      this.addRoomValidator.validateAllFormFields();
    } else {
      console.log(this.formRoom.value);
    }
  }
}
