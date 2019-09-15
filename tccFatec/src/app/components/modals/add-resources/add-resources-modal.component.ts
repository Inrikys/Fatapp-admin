import { Component, OnInit } from '@angular/core';
import { AddResourceValidatorService } from 'src/app/services/validators/add-resource/add-resource-validator.service';

@Component({
  selector: 'app-add-resources-modal',
  templateUrl: './add-resources-modal.component.html',
  styleUrls: ['./add-resources-modal.component.scss'],
})
export class AddResourcesModalComponent implements OnInit {

  public addResourceForm;
  public validationMessages;

  constructor(
    private addResourceValidator: AddResourceValidatorService,
  ) {
    this.addResourceForm = this.addResourceValidator.getAddResourceForm();
    this.validationMessages = this.addResourceValidator.getAddResourceFormValidationsMessages();
  }

  ngOnInit() { }

  submit() {
    if (!this.addResourceForm.valid) {
      this.addResourceValidator.validateAllFormFields();
    } else {
      console.log(this.addResourceForm.value);
    }
  }

}
