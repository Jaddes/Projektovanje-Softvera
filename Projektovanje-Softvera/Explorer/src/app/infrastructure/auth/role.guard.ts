import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoles = (route.data?.['roles'] as string[] | undefined) ?? [];
    const user = this.authService.user$.getValue();

    if (!user?.username) {
      return this.router.createUrlTree(['/login']);
    }

    if (allowedRoles.length === 0) {
      return true;
    }

    const normalizedRole = (user.role || '').toLowerCase();
    const isAllowed = allowedRoles.some(role => role.toLowerCase() === normalizedRole);

    return isAllowed ? true : this.router.createUrlTree(['/']);
  }
}
