import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-present-list',
  templateUrl: './present-list.page.html',
  styleUrls: ['./present-list.page.scss'],
})
export class PresentListPage implements OnInit {

  public presentListForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
   }

  private createForm() {
    this.presentListForm = this.formBuilder.group({
      date_start: this.formBuilder.control(''),
      date_end: this.formBuilder.control(''),
    });
  }

  ngOnInit() {
  }

}
