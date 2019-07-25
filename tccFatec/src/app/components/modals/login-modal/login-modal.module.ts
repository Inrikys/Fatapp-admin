import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {LoginModalComponent} from './login-modal.component';
import {ComponentsModule} from "../../components.module";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
  ],
  declarations: [LoginModalComponent],
  entryComponents:[LoginModalComponent]
})
export class LoginModalModule { }
