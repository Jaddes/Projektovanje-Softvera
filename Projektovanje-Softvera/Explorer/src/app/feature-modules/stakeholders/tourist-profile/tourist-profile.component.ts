import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../model/profile.model';
import { ProfileClientService } from '../profile-client.service';

@Component({
  selector: 'xp-tourist-profile',
  templateUrl: './tourist-profile.component.html',
  styleUrls: ['./tourist-profile.component.css']
})
export class TouristProfileComponent implements OnInit {

  profile?: Profile;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private readonly profileService: ProfileClientService,
    private readonly router: Router
  ) {}

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
    this.profileService.getTouristProfile().subscribe({
      next: (profile: Profile) => {
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

  editProfile(): void {
    this.router.navigate(['/tourist/profile/edit']);
  }
}
