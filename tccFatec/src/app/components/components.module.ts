import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";

// headers
import {ModalHeaderComponent} from "./headers/modal-header/modal-header.component";
import {PageHeaderComponent} from "./headers/page-header/page-header.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
    declarations: [
        ModalHeaderComponent,
        PageHeaderComponent
    ],
    exports: [
        ModalHeaderComponent,
        PageHeaderComponent
    ],
})
export class ComponentsModule { }
