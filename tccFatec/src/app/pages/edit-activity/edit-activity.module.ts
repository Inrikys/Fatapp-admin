import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditActivityPage } from './edit-activity.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrMaskerModule } from 'br-mask';
import { ActivitiesModule } from 'src/app/components/modals/activities/activities.module';

const routes: Routes = [
  {
    path: '',
    component: EditActivityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    BrMaskerModule,
    ActivitiesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditActivityPage]
})
export class EditActivityPageModule {}
