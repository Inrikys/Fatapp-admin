import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddRoomModalComponent} from './add-room-modal.component';
import {IonicModule} from "@ionic/angular";
import {ComponentsModule} from "../../components.module";

@NgModule({
  declarations: [AddRoomModalComponent],
  entryComponents: [AddRoomModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule
  ]
})
export class AddRoomModalModule { }
