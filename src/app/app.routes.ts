import {Routes} from '@angular/router';
import {CompetitionComponent} from "./features/competition/competition.component";
import {MemberComponent} from "./features/member/member.component";
import {CompetitionDetailsComponent} from "./features/competition-details/competition-details.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'competition',
    pathMatch: 'full'
  },


  {
    path: 'competitions/:page',
    component: CompetitionComponent
  },
  {
    path: 'competitions',
    component: CompetitionComponent,
  },
  {
    path: 'competition/details/:id',
    component: CompetitionDetailsComponent
  },


  {
    path: 'members/:page',
    component: MemberComponent
  },
  {
    path: 'members',
    component: MemberComponent
  }
];
