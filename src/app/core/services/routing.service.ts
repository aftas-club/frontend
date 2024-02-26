import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) {
  }

  async navigateTo(to: string) {
    await this.router.navigateByUrl(to);
  }
}
