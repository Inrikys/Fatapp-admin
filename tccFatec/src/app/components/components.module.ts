import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalHeaderComponent} from "./headers/modal-header/modal-header.component";
import {IonicModule} from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
    declarations: [ModalHeaderComponent],
    exports: [ModalHeaderComponent],
})
export class ComponentsModule { }
