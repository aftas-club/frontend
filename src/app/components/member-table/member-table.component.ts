import {AfterViewInit, Component, ElementRef, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from "../../core/services/member.service";
import {Pagination} from "../../core/model/pagination";
import {Member} from "../../core/model/member";
import {OceanComponent} from "../../shared/ocean/ocean.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TuiForModule} from "@taiga-ui/cdk";
import {Range} from "../../utils/range";
import {TuiDialogService, TuiLoaderModule} from "@taiga-ui/core";
import {WavesComponent} from "../../shared/waves/waves.component";
import {Gender} from "../../core/enum/gender";
import {TuiCheckboxModule} from "@taiga-ui/kit";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AddMemberComponent} from "../add-member/add-member.component";
import {TableSkeletonComponent} from "../../shared/table-skeleton/table-skeleton.component";
import {Subscription, timer} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-member-table',
  standalone: true,
  imports: [
    OceanComponent,
    NgForOf,
    TuiForModule,
    TuiLoaderModule,
    NgIf,
    WavesComponent,
    NgOptimizedImage,
    TuiCheckboxModule,
    ReactiveFormsModule,
    TableSkeletonComponent
  ],
  templateUrl: './member-table.component.html'
})
export class MemberTableComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private readonly el: ElementRef,
    public service: MemberService,
    public route: ActivatedRoute,
    public router: Router,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {
  }

  protected members: Member[] = [];
  protected currentPage: number = 0;
  protected totalElements: number = 0;
  protected totalPages: number = 0;
  protected pageSize: number = 5;
  protected readonly Gender = Gender;
  protected readonly Range = Range.range;
  protected pageable: Pagination<Member>
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
      Math.floor((this.el.nativeElement.offsetHeight - 280) / 69);
    this.pageSize = this.pageSize <= 0 ? 5 : this.pageSize;
    this.getMembers();
    window.addEventListener('createdMember', (data: any) => {
      if (this.members.length < this.pageSize) {
        this.members.push(data.detail);
      } else {
        this.getMembers();
      }
    });
  }

  public getMembers() {
    this.members = [];
    this.service.getMembers(this.currentPage, this.pageSize)
      .subscribe((data: Pagination<Member>) => {
        timer(200).pipe(
          map(() => {
              this.members = data.content;
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
    this.getMembers();
    await this.navigateToPage(this.currentPage);
  }

  public async previousPage() {
    if (this.currentPage <= 0) {
      return;
    }
    this.currentPage--;
    this.getMembers();
    await this.navigateToPage(this.currentPage);
  }

  async goToPage(page: number) {
    this.currentPage = page;
    await this.navigateToPage(this.currentPage);
    this.getMembers();
  }

  async navigateToPage(newPage: number) {
    await this.router.navigate(['/members', newPage.toString()]);
  }

  ngOnDestroy() {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }
}
