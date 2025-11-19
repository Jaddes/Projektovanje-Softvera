import { Component, OnInit } from '@angular/core';
import { TutorProfile } from '../model/tutor-profile.model';
import { TutorProfileService } from '../tutor-profile.service';

@Component({
  selector: 'xp-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {

  profile?: TutorProfile;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private readonly tutorService: TutorProfileService) { }

  ngOnInit(): void {
    const navState = window.history.state as { profileUpdated?: boolean };
    if (navState?.profileUpdated) {
      this.successMessage = 'Profile updated successfully.';
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    this.loadProfile();
  }

  private loadProfile(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tutorService.getMyProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isLoading = false;
      },
      error: () => {
        this.profile = undefined;
        this.isLoading = false;
        this.errorMessage = 'Unable to load your profile. Please try again later.';
      }
    });
  }
}
