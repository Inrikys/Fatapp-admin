import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {AccountModalComponent} from "./account-modal.component";



@NgModule({

  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [AccountModalComponent],
  entryComponents:[AccountModalComponent],
})
export class AccountModalModule { }
