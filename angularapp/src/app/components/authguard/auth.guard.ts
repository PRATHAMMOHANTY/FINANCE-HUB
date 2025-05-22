import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if the user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const url: string = state.url;

    // RegionalManager role check
    if (url.includes('manager')) {
      if (this.authService.isRegionalManager()) {
        return true;
      }
      this.router.navigate(['/error']);
      return false;
    }

    // Customer role check
    if (url.includes('user')) {
      if (this.authService.isCustomer()) {
        return true;
      }
      this.router.navigate(['/error']);
      return false;
    }

    return true;
  }
}
