import { Component } from '@angular/core';
import {AdminLayoutComponent} from "../../layout/admin-layout/admin-layout.component";
import {CompetitionListComponent} from "../../components/competition-list/competition-list.component";

@Component({
  selector: 'app-competition-details',
  standalone: true,
  imports: [
    AdminLayoutComponent,
    CompetitionListComponent
  ],
  templateUrl: './competition-details.component.html',
  styleUrl: './competition-details.component.css'
})
export class CompetitionDetailsComponent {

}
