import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

// Headers
import {ModalHeaderComponent} from './headers/modal-header/modal-header.component';
import {PageHeaderComponent} from './headers/page-header/page-header.component';

// Room
import {RoomComponentComponent} from './room-component/room-component.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
    declarations: [
        ModalHeaderComponent,
        PageHeaderComponent,
        RoomComponentComponent,
    ],
    exports: [
        ModalHeaderComponent,
        PageHeaderComponent,
        RoomComponentComponent,
    ],
})
export class ComponentsModule { }
