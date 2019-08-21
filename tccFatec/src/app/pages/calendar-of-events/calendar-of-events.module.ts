import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarOfEventsPage } from './calendar-of-events.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarOfEventsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarOfEventsPage]
})
export class CalendarOfEventsPageModule {}
