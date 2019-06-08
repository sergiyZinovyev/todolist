import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user/login', component: LoginComponent},
  { path: 'user/registration', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
