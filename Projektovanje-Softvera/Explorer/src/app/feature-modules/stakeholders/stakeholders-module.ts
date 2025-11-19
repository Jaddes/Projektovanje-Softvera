import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
import { TutorProfileEditComponent } from './tutor-profile-edit/tutor-profile-edit.component';

@NgModule({
  declarations: [
    TutorProfileComponent,
    TutorProfileEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TutorProfileComponent,
    TutorProfileEditComponent
  ]
})
export class StakeholdersModule { }
