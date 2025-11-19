import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../model/profile.model';
import { ProfileClientService } from '../profile-client.service';

@Component({
  selector: 'xp-tourist-profile-edit',
  templateUrl: './tourist-profile-edit.component.html',
  styleUrls: ['./tourist-profile-edit.component.css']
})
export class TouristProfileEditComponent implements OnInit {

  private readonly maxImageSize = 2 * 1024 * 1024; // 2 MB
  readonly biographyMaxLength = 250;
  readonly mottoMaxLength = 250;

  profileForm = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    biography: ['', [Validators.maxLength(this.biographyMaxLength)]],
    motto: ['', [Validators.maxLength(this.mottoMaxLength)]],
    profilePictureUrl: ['']
  });

  isSaving = false;
  errorMessage = '';
  profilePictureError = '';
  avatarPreview: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly profileService: ProfileClientService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  get name() {
    return this.profileForm.get('name');
  }

  get surname() {
    return this.profileForm.get('surname');
  }

  get biography() {
    return this.profileForm.get('biography');
  }

  get motto() {
    return this.profileForm.get('motto');
  }

  private loadProfile(): void {
    this.profileService.getTouristProfile().subscribe({
      next: (profile) => {
        this.patchForm(profile);
      },
      error: () => {
        this.errorMessage = 'Unable to load your profile.';
      }
    });
  }

  private patchForm(profile: Profile): void {
    this.profileForm.patchValue({
      name: profile.name ?? '',
      surname: profile.surname ?? '',
      biography: profile.biography ?? '',
      motto: profile.motto ?? '',
      profilePictureUrl: profile.profilePictureUrl ?? ''
    });
    this.avatarPreview = profile.profilePictureUrl ?? null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    this.profilePictureError = '';

    if (!file) {
      return;
    }

    const mimeType = file.type.toLowerCase();
    if (mimeType !== 'image/jpeg' && mimeType !== 'image/png') {
      this.profilePictureError = 'Profile picture must be a JPG or PNG image.';
      this.profileForm.patchValue({ profilePictureUrl: '' });
      if (input) {
        input.value = '';
      }
      return;
    }

    if (file.size > this.maxImageSize) {
      this.profilePictureError = 'Profile picture must be smaller than 2 MB.';
      this.profileForm.patchValue({ profilePictureUrl: '' });
      if (input) {
        input.value = '';
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const value = reader.result?.toString() ?? '';
      this.profileForm.patchValue({ profilePictureUrl: value });
      this.avatarPreview = value;
    };
    reader.readAsDataURL(file);
  }

  save(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.profileService.updateTouristProfile(this.profileForm.value as Profile).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/tourist/profile'], { state: { profileUpdated: true } });
      },
      error: () => {
        this.isSaving = false;
        this.errorMessage = 'Something went wrong while saving your profile. Please try again.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/tourist/profile']);
  }
}
