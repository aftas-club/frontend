import {Routes} from '@angular/router';
import {CompetitionComponent} from "./features/competition/competition.component";
import {MemberComponent} from "./features/member/member.component";
import {CompetitionDetailsComponent} from "./features/competition-details/competition-details.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {CallbackComponent} from "./features/auth/Oauth/callback/callback.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {ForgotPasswordComponent} from "./features/auth/forgot-password/forgot-password.component";
import {ProfileComponent} from "./features/profile/profile.component";

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'Oauth/callback', component: CallbackComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
    ]
  },
  {
    path: 'users',
    children: [
      {path: '', component: ProfileComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  },
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
