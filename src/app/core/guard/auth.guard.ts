import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {AuthenticationService} from "../services/authentication.service";
import {RoutingService} from "../services/routing.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: RoutingService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      map(authenticated => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigateToLoginPage().then();
          return false;
        }
      })
    );
  }
}
