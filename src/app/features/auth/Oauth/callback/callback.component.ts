import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {LoginComponent} from "../../login/login.component";
import {TuiAlertService, TuiLoaderModule} from "@taiga-ui/core";
import {RoutingService} from "../../../../core/services/routing.service";

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [
    LoginComponent,
    TuiLoaderModule
  ],
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: RoutingService,
    private authService: AuthenticationService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(async (params) => {
          let code = params["code"];
          if (code !== undefined && code !== null && code.length > 0)
            this.authService.OauthGoogleAuthenticate(code).subscribe(
              (isValid: boolean) => {
                if (!isValid) {
                  this.alerts.open('', {
                    label: 'Invalid Google auth code callback',
                    status: 'error',
                    autoClose: true,
                  }).subscribe(() => this.router.navigateTo('auth/login'));
                }
              }
            );
          else {
            this.alerts.open('', {
              label: 'Invalid Google auth code callback',
              status: 'error',
              autoClose: true,
            }).subscribe();
            await this.router.navigateTo('auth/login')
          }
        }
      );
  }

}
