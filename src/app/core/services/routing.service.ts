import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) {
  }

  navigateTo(to: string) {
    return this.router.navigateByUrl(to);
  }

  goToUser() {
    return this.router.navigateByUrl("user");
  }

  goToManager() {
    return this.router.navigateByUrl("manager");
  }

  goToMember() {
    return this.router.navigateByUrl("member");
  }

  goToJury() {
    return this.router.navigateByUrl("jury");
  }

  navigateToLoginPage(){
    return this.router.navigateByUrl("auth/login");
  }
}
