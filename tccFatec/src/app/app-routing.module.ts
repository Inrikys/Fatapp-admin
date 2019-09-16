import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminAccessGuard } from './guards/admin-access.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'privacy-policy', loadChildren: './pages/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule' },
  {
    path: 'admin',
    canActivate: [AdminAccessGuard],
    children: [
      { path: 'user-register', loadChildren: './pages/user-register/user-register.module#UserRegisterPageModule' },
      { path: 'access-control', loadChildren: './pages/access-control/access-control.module#AccessControlPageModule' },
      { path: 'room', loadChildren: './pages/room/room.module#RoomPageModule' },
      { path: 'calendar-of-events', loadChildren: './pages/calendar-of-events/calendar-of-events.module#CalendarOfEventsPageModule' },
      { path: 'present-list', loadChildren: './pages/present-list/present-list.module#PresentListPageModule' },
      { path: 'edit-room', loadChildren: './pages/edit-room/edit-room.module#EditRoomPageModule' },
      { path: 'qr-code', loadChildren: './pages/room/qr-code/qr-code.module#QrCodePageModule' },
    ]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
