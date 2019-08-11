import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AdminAccessGuard} from "./guards/admin-access.guard";

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
        ]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
