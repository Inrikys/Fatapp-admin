import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { IonicModule } from '@ionic/angular';

import { CalendarOfEventsPage } from './calendar-of-events.page';
import {ComponentsModule} from '../../components/components.module';
import { RegisterActivityModalModule } from 'src/app/components/modals/register-activity-modal/register-activity-modal.module';

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
        RouterModule.forChild(routes),
        ComponentsModule,
        FontAwesomeModule,
        RegisterActivityModalModule,
    ],
  declarations: [CalendarOfEventsPage]
})
export class CalendarOfEventsPageModule {}
