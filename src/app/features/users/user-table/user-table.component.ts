import {AfterViewInit, Component, ElementRef, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {OceanComponent} from "../../../shared/ocean/ocean.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TableSkeletonComponent} from "../../../shared/table-skeleton/table-skeleton.component";
import {TuiAvatarModule, TuiCheckboxModule, TuiDataListDropdownManagerModule, TuiTagModule} from "@taiga-ui/kit";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogService,
  TuiDropdownModule,
  TuiLoaderModule,
  TuiSvgModule
} from "@taiga-ui/core";
import {WavesComponent} from "../../../shared/waves/waves.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Pagination} from "../../../core/model/pagination";
import {Subscription, timer} from "rxjs";
import {map} from "rxjs/operators";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {AddMemberComponent} from "../../../components/add-member/add-member.component";
import {Gender} from "../../../core/enum/gender";
import {Range} from "../../../utils/range";
import {AdminLayoutComponent} from "../../../layout/admin-layout/admin-layout.component";
import {User} from "../../../core/model/user";
import {UserService} from "../../../core/services/user.service";
import {UserStatus} from "../../../core/enum/user-status";
import {UserDetailComponent} from "../user-detail/user-detail.component";

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    OceanComponent,
    ReactiveFormsModule,
    TableSkeletonComponent,
    TuiCheckboxModule,
    TuiLoaderModule,
    WavesComponent,
    AdminLayoutComponent,
    TuiAvatarModule,
    TuiTagModule,
    TuiSvgModule,
    TuiDropdownModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiDataListDropdownManagerModule
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private readonly el: ElementRef,
    public service: UserService,
    public route: ActivatedRoute,
    public router: Router,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {
  }

  protected users: User[] = [];
  protected currentPage: number = 0;
  protected totalElements: number = 0;
  protected totalPages: number = 0;
  protected pageSize: number = 5;
  protected readonly Gender = Gender;
  protected readonly Range = Range.range;
  protected pageable: Pagination<User>
    = Object.create(null);

  checkboxForm = new FormGroup({
    check: new FormControl(false)
  });

  private dialogRefSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentPage = params['page'] || 0;
    });
  }

  ngAfterViewInit() {
    this.pageSize =
      Math.floor((this.el.nativeElement.offsetHeight - 400) / 69);
    this.pageSize = this.pageSize <= 0 ? 5 : this.pageSize;
    this.getUsers();
    window.addEventListener('createdUser', (data: any) => {
      if (this.users.length < this.pageSize) {
        this.users.push(data.detail);
      } else {
        this.getUsers();
      }
    });
  }

  public getUsers() {
    this.users = [];
    this.service.getUsers(this.currentPage, this.pageSize)
      .subscribe((data: Pagination<User>) => {
        timer(200).pipe(
          map(() => {
              this.users = data.content;
              this.pageable = data;
              this.totalPages = data.totalPages;
              this.totalElements = data.totalElements;
            }
          )).subscribe()
      });
  }

  showDialog() {
    this.dialogRefSubscription = this.dialogs
      .open(
        new PolymorpheusComponent(AddMemberComponent, this.injector),
        {
          size: 'l',
          closeable: true,
          dismissible: true,
          required: true,
        },
      )
      .subscribe();
  }

  public async nextPage() {
    if (this.currentPage >= this.totalPages - 1) {
      return;
    }
    this.currentPage++;
    this.getUsers();
    await this.navigateToPage(this.currentPage);
  }

  public async previousPage() {
    if (this.currentPage <= 0) {
      return;
    }
    this.currentPage--;
    this.getUsers();
    await this.navigateToPage(this.currentPage);
  }

  async goToPage(page: number) {
    this.currentPage = page;
    await this.navigateToPage(this.currentPage);
    this.getUsers();
  }

  async navigateToPage(newPage: number) {
    await this.router.navigate(['manager/users', newPage.toString()]);
  }

  ngOnDestroy() {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }

  protected readonly UserStatus = UserStatus;

  showUserDetail(user: User, dropdown: { toggle: (arg0: boolean) => void; }) {
    dropdown.toggle(false)
    this.dialogRefSubscription = this.dialogs
      .open<User>(
        new PolymorpheusComponent(UserDetailComponent, this.injector),
        {
          size: 'l',
          closeable: true,
          dismissible: true,
          required: true,
          data: user
        },
      )
      .subscribe({
        next: data => {
          user = data;
        }
      });
  }
}
