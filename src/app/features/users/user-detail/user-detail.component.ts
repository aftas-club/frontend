import {Component, Inject, OnInit} from '@angular/core';
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiAlertService, TuiButtonModule, TuiDialogContext, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {User} from "../../../core/model/user";
import {Gender} from "../../../core/enum/gender";
import {UserStatus} from "../../../core/enum/user-status";
import {TuiDataListWrapperModule, TuiSelectModule, TuiTagModule, TuiToggleModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Role} from "../../../core/enum/role";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    TuiTagModule,
    TuiButtonModule,
    TuiToggleModule,
    ReactiveFormsModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    FormsModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<User>,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private service: UserService
  ) {
  }

  user: User = Object.create(null) as User;
  previousUser: User = Object.create(null) as User;
  editUserToggleable: boolean = true;

  ngOnInit(): void {
    this.user = this.context.data as unknown as User;
    this.previousUser = this.user;
  }

  close() {
    this.user = this.previousUser;
    this.context.completeWith(this.user);
  }

  protected readonly Gender = Gender;
  protected readonly UserStatus = UserStatus;

  EditUserToggle() {
    this.editUserToggleable = !this.editUserToggleable;
  }

  saveUser() {
    this.service.updateUser(this.user).subscribe((user: User) => {
      this.context.completeWith(user);
      this.alerts.open('', {
        label: `User Updated Successfully !`,
        status: 'success',
        autoClose: true,
      }).subscribe(() => this.editUserToggleable = true);
    });
  }

  protected readonly Object = Object;
  protected readonly Role = Role;
}
