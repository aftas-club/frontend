import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {TuiDialogService, TuiLoaderModule} from "@taiga-ui/core";
import {SquareAnimateTopComponent} from "../../shared/square-animate-top/square-animate-top.component";
import {NgForOf, NgIf, NgOptimizedImage, Time} from "@angular/common";
import {Range} from "../../utils/range";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CompetitionService} from "../../core/services/competition.service";
import {Competition} from "../../core/model/competition";
import {Pagination} from "../../core/model/pagination";
import {AddressFormatter} from "../../utils/address-formatter";
import {CardSkeletonComponent} from "../../shared/card-skeleton/card-skeleton.component";
import {Subscription, timer} from "rxjs";
import {map} from "rxjs/operators";
import {CompetitionStatus} from "../../core/enum/competition-status";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {AddMemberComponent} from "../add-member/add-member.component";
import {AddCompetitionComponent} from "../add-competition/add-competition.component";

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [
    TuiLoaderModule,
    SquareAnimateTopComponent,
    NgForOf,
    CardSkeletonComponent,
    NgIf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './competition-list.component.html',
  styleUrl: './competition-list.component.css'
})
export class CompetitionListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  constructor(
    private readonly el: ElementRef,
    private readonly service: CompetitionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {
  }

  protected competitions: Competition[] = [];
  protected pageable: Pagination<Competition>
    = Object.create(null);

  protected currentPage: number = 0;
  protected totalElements: number = 0;
  protected totalPages: number = 0;
  protected pageSize: number = 3;

  private dialogRefSubscription: Subscription | undefined;

  protected readonly Range = Range.range;
  protected readonly CompetitionStatus = CompetitionStatus;
  protected readonly Address = AddressFormatter.formatAddress;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentPage = params['page'] || 0;
    });
  }

  ngAfterViewInit() {
    this.pageSize =
      Math.floor(this.el.nativeElement.offsetWidth / 384);
    this.pageSize = this.pageSize <= 0 ? 5 : this.pageSize;
    this.getCompetitions();
    // window.addEventListener('OpenedSideBar', () => {
    //   this.pageSize =
    //     Math.floor(this.el.nativeElement.offsetWidth / 384);
    //   this.pageSize = this.pageSize <= 0 ? 5 : this.pageSize;
    //   this.getCompetitions();
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageSize =
      Math.floor(this.el.nativeElement.offsetWidth / 384);
    this.pageSize = this.pageSize <= 0 ? 5 : this.pageSize;
    this.getCompetitions();
  }

  ngOnDestroy() {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }

  getCompetitions() {
    this.competitions = [];
    this.service.getCompetitions(this.currentPage, this.pageSize)
      .subscribe(pageable => {
        timer(200).pipe(
          map(() => {
              this.pageable = pageable;
              this.competitions = pageable.content;
              this.totalElements = pageable.totalElements;
              this.totalPages = pageable.totalPages;
            }
          )).subscribe()
      });
  }

  combineDateTime(date: Date, time: Time): Date {
    const combinedDate = new Date(date);
    const times = String(time).split(':');
    combinedDate.setHours(Number(times[0]));
    combinedDate.setMinutes(Number(times[1]));
    combinedDate.setMinutes(Number(times[2]));
    return new Date(combinedDate);
  }

  getCompetitionStatus(date: any, startTime: any, endTime: any): CompetitionStatus {
    const currentDate = new Date();
    const startDate = this.combineDateTime(date, startTime);
    const endDate = this.combineDateTime(date, endTime);
    if (currentDate < startDate) {
      return CompetitionStatus.NOT_STARTED;
    } else if (currentDate >= startDate && currentDate < endDate) {
      return CompetitionStatus.OPEN;
    } else if (currentDate >= endDate) {
      return CompetitionStatus.FINISHED;
    } else {
      return CompetitionStatus.CLOSED;
    }
  }

  showDialog() {
    this.dialogRefSubscription = this.dialogs
      .open(
        new PolymorpheusComponent(AddCompetitionComponent, this.injector),
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
    this.getCompetitions();
    await this.navigateToPage(this.currentPage);
  }

  public async previousPage() {
    if (this.currentPage <= 0) {
      return;
    }
    this.currentPage--;
    this.getCompetitions();
    await this.navigateToPage(this.currentPage);
  }

  async goToPage(page: number) {
    this.currentPage = page;
    this.getCompetitions();
    await this.navigateToPage(this.currentPage);
  }

  async navigateToPage(newPage: number) {
    await this.router.navigate(['/competitions', newPage.toString()]);
  }

}
