import { Routes } from '@angular/router';
import {CompetitionComponent} from "./features/competition/competition.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'fish',
    pathMatch: 'full'
  },
  {
    path: 'competition',
    component: CompetitionComponent
  }
];
