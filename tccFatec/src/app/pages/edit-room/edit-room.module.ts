import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditRoomPage } from './edit-room.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddResourcesModalModule } from 'src/app/components/modals/add-resources/add-resources-modal.module';
import { RegisterResourceModalModule } from 'src/app/components/modals/register-resource/register-resource-modal.module';

const routes: Routes = [
  {
    path: '',
    component: EditRoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    AddResourcesModalModule,
    RegisterResourceModalModule,
  ],
  declarations: [EditRoomPage]
})
export class EditRoomPageModule {}
