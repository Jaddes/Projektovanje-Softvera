import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';
  isSubmitting = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    const credentials = this.loginForm.value as Login;
    this.authService.login(credentials).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.errorMessage = '';
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error?.status === 400 || error?.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else {
          this.errorMessage = 'Cannot reach server. Is the API running?';
        }
      }
    });
  }
}
