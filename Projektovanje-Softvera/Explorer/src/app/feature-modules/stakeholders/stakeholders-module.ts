import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TouristProfileComponent } from './tourist-profile/tourist-profile.component';
import { TouristProfileEditComponent } from './tourist-profile-edit/tourist-profile-edit.component';
import { AuthorProfileComponent } from './author-profile/author-profile.component';
import { AuthorProfileEditComponent } from './author-profile-edit/author-profile-edit.component';

@NgModule({
  declarations: [
    TouristProfileComponent,
    TouristProfileEditComponent,
    AuthorProfileComponent,
    AuthorProfileEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    TouristProfileComponent,
    TouristProfileEditComponent,
    AuthorProfileComponent,
    AuthorProfileEditComponent
  ]
})
export class StakeholdersModule { }
