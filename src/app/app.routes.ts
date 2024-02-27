import {Routes} from '@angular/router';
import {CompetitionComponent} from "./features/competition/competition.component";
import {MemberComponent} from "./features/member/member.component";
import {CompetitionDetailsComponent} from "./features/competition/competition-details/competition-details.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {CallbackComponent} from "./features/auth/Oauth/callback/callback.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {ForgotPasswordComponent} from "./features/auth/forgot-password/forgot-password.component";
import {ProfileComponent} from "./features/users/profile/profile.component";
import {UserTableComponent} from "./features/users/user-table/user-table.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {RoleManagerGuard} from "./core/guard/role-manager.guard";
import {RoleMemberGuard} from "./core/guard/role-member.guard";
import {RoleJuryGuard} from "./core/guard/role-jury.guard";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
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
    path: 'user',
    children: [
      {path: '', component: ProfileComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  },
  {
    path: 'manager',
    canActivate: [AuthGuard, RoleManagerGuard],
    children: [
      {path: '', component: UserTableComponent},
      {path: 'users/:page', component: UserTableComponent},
      {path: 'users', component: UserTableComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  },
  {
    path: 'member',
    canActivate: [AuthGuard, RoleMemberGuard],
    children: [
      {path: 'users/:page', component: UserTableComponent},
      {path: 'users', component: UserTableComponent},
      {path: 'profile', component: ProfileComponent},
      {
        path: '',
        component: CompetitionComponent
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
    ]
  },
  {
    path: 'jury',
    canActivate: [AuthGuard, RoleJuryGuard],
    children: [
      {path: 'users/:page', component: UserTableComponent},
      {path: 'users', component: UserTableComponent},
      {path: 'profile', component: ProfileComponent},
    ]
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
