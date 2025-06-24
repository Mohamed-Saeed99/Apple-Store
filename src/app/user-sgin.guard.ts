import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserSginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard: IsLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      console.log('AuthGuard: Redirecting to /login');
      this.router.navigate(['/SignIN']);
    }
    return isLoggedIn;
  }

}
