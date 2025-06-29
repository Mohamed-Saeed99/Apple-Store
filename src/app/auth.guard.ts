import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard: IsLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      console.log('AuthGuard: Redirecting to /login');
      this.router.navigate(['/Login']);
    }
    return isLoggedIn;
  }


}
