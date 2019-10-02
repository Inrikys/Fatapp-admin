import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterActivityModalComponent } from './register-activity-modal.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [RegisterActivityModalComponent],
  entryComponents: [RegisterActivityModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
  ]
})
export class RegisterActivityModalModule { }
