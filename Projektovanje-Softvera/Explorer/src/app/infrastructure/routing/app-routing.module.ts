import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { TouristProfileComponent } from 'src/app/feature-modules/stakeholders/tourist-profile/tourist-profile.component';
import { TouristProfileEditComponent } from 'src/app/feature-modules/stakeholders/tourist-profile-edit/tourist-profile-edit.component';
import { AuthorProfileComponent } from 'src/app/feature-modules/stakeholders/author-profile/author-profile.component';
import { AuthorProfileEditComponent } from 'src/app/feature-modules/stakeholders/author-profile-edit/author-profile-edit.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard]},
  {path: 'tourist/profile', component: TouristProfileComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['tourist'] }},
  {path: 'tourist/profile/edit', component: TouristProfileEditComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['tourist'] }},
  {path: 'author/profile', component: AuthorProfileComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['author'] }},
  {path: 'author/profile/edit', component: AuthorProfileEditComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['author'] }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
