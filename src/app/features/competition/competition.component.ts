import { Component } from '@angular/core';
import {SideBarComponent} from "../../shared/side-bar/side-bar.component";
import {AdminLayoutComponent} from "../../layout/admin-layout/admin-layout.component";
import {FishAnimationComponent} from "../../shared/fish-animation/fish-animation.component";
import {OceanComponent} from "../../shared/ocean/ocean.component";
import {DripDropAnimationComponent} from "../../shared/drip-drop-animation/drip-drop-animation.component";
import {CompetitionListComponent} from "../../components/competition-list/competition-list.component";

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    SideBarComponent,
    AdminLayoutComponent,
    FishAnimationComponent,
    OceanComponent,
    DripDropAnimationComponent,
    CompetitionListComponent
  ],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent {

}
