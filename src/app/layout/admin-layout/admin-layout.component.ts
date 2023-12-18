import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiModeModule, TuiRootModule, TuiThemeNightModule} from '@taiga-ui/core';
import {AbstractTuiThemeSwitcher, TuiLetModule} from "@taiga-ui/cdk";
import {BehaviorSubject, Observable} from 'rxjs';
import {initFlowbite} from 'flowbite';
import {SideBarComponent} from "../../shared/side-bar/side-bar.component";
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {OceanComponent} from "../../shared/ocean/ocean.component";
import {DripDropAnimationComponent} from "../../shared/drip-drop-animation/drip-drop-animation.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    SideBarComponent,
    NavBarComponent,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    TuiLetModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiModeModule,
    FormsModule,
    OceanComponent,
    DripDropAnimationComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent extends AbstractTuiThemeSwitcher implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }

  isOpenedSideBar = false;
  isNight = false;
  private nightSubject = new BehaviorSubject<boolean>(this.isNight);

  night$: Observable<boolean> = this.nightSubject.asObservable();

  toggleNight() {
    this.isNight = !this.isNight;
    this.nightSubject.next(this.isNight);
  }

  IsOpenedSideBar($event: boolean) {
    this.isOpenedSideBar = $event;
  }
}
