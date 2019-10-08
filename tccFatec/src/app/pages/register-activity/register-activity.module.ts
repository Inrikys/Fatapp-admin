import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterActivityPage } from './register-activity.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SpeakersModule } from 'src/app/components/modals/speakers/speakers.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterActivityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    SpeakersModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterActivityPage]
})
export class RegisterActivityPageModule {}
