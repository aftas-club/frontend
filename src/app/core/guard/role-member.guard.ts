import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {RoutingService} from "../services/routing.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleMemberGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: RoutingService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.getRoles().includes('ROLE_MEMBER')) {
      return true;
    }

    this.router.navigateToLoginPage().then()
    return false;
  }
}
