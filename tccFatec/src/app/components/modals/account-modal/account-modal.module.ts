import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {AccountModalComponent} from "./account-modal.component";
import {ComponentsModule} from "../../components.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({

    imports: [
        CommonModule,
        IonicModule,
        ComponentsModule,
        ReactiveFormsModule,
    ],
  declarations: [AccountModalComponent],
  entryComponents:[AccountModalComponent],
})
export class AccountModalModule { }
