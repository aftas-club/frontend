import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AbstractTuiThemeSwitcher, TuiLetModule} from "@taiga-ui/cdk";
import {FormsModule} from "@angular/forms";
import {TuiModeModule, TuiRootModule, TuiThemeNightModule} from "@taiga-ui/core";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {OceanComponent} from "../../shared/ocean/ocean.component";
import {WavesComponent} from "../../shared/waves/waves.component";
import {SquareAnimateTopComponent} from "../../shared/square-animate-top/square-animate-top.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    FormsModule,
    TuiThemeNightModule,
    TuiRootModule,
    AsyncPipe,
    TuiModeModule,
    TuiLetModule,
    NgIf,
    RouterOutlet,
    OceanComponent,
    WavesComponent,
    SquareAnimateTopComponent
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent extends AbstractTuiThemeSwitcher{
  isNight = false;
  private nightSubject = new BehaviorSubject<boolean>(this.isNight);

  night$: Observable<boolean> = this.nightSubject.asObservable();

  toggleNight() {
    this.isNight = !this.isNight;
    this.nightSubject.next(this.isNight);
  }
}
