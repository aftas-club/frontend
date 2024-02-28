import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {TuiAlertService, TuiButtonModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  TUI_PASSWORD_TEXTS,
  TuiCheckboxModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiMarkerIconModule
} from '@taiga-ui/kit';
import {of} from 'rxjs';
import * as events from "events";
import {AuthLayoutComponent} from "../../../layout/auth-layout/auth-layout.component";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {RoutingService} from "../../../core/services/routing.service";
import {SquareAnimateTopComponent} from "../../../shared/square-animate-top/square-animate-top.component";
import {OceanComponent} from "../../../shared/ocean/ocean.component";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    TuiMarkerIconModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiInputPasswordModule,
    TuiInputModule,
    SquareAnimateTopComponent,
    OceanComponent,
    TuiCheckboxModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    {
      provide: TUI_PASSWORD_TEXTS,
      useValue: of(['']),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
      @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
      private authService: AuthenticationService,
      private router: RoutingService
  ) {
  }

  googleOauthUrl: string | null = null;
  googleOauthUrlNotReady: boolean = true;

  ngOnInit(): void {
    this.authService.getOauthGoogleUrl().subscribe((url: string) => {
      this.googleOauthUrl = url;

      if (this.googleOauthUrl && this.googleOauthUrl.length > 0)
        this.googleOauthUrlNotReady = false;
    });
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  notReadyToSubmit = true;

  checkIfReadyToSubmit() {
    this.notReadyToSubmit = this.loginForm.invalid;
  }

  async login() {
    try {
      if (this.loginForm.invalid) {
        this.alerts.open('', {
          label: 'Please enter all fields',
          status: 'warning',
          autoClose: true,
        }).subscribe();
      } else {
        this.notReadyToSubmit = true;
        this.authService.authenticate(this.loginForm.value).subscribe((result: boolean) => {
          if (result) {
            this.alerts.open('', {
              label: 'Successfully logged in',
              status: 'success',
              autoClose: true,
            }).subscribe();
            window.dispatchEvent(new Event("userLogged"));
            this.authService.redirectToSpecificPage()
          } else
            this.notReadyToSubmit = true;
        });
      }
    } catch (error) {
      console.log(error);
      this.alerts.open('', {
        label: 'Invalid credentials',
        status: 'error',
        autoClose: true,
      }).subscribe();
    }
  }


  protected readonly events = events;

  goToOauthGoogle() {
    if (this.googleOauthUrl != null || this.googleOauthUrl != "")
      location.assign(this.googleOauthUrl as string)
    else
      this.alerts.open('', {
        label: 'Invalid Google auth url',
        status: 'error',
        autoClose: true,
      }).subscribe();
  }
}
