import {AfterViewInit, Component, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {AdminLayoutComponent} from "../../layout/admin-layout/admin-layout.component";
import {CompetitionListComponent} from "../../components/competition-list/competition-list.component";
import {Competition} from "../../core/model/competition";
import {CompetitionService} from "../../core/services/competition.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TuiAlertService, TuiDialogService, TuiLoaderModule, TuiSvgModule} from "@taiga-ui/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {OceanComponent} from "../../shared/ocean/ocean.component";
import {WavesComponent} from "../../shared/waves/waves.component";
import {TuiTabsModule} from "@taiga-ui/kit";
import {FormsModule} from "@angular/forms";
import {AddressFormatter} from "../../utils/address-formatter";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {Subscription} from "rxjs";
import {RankingComponent} from "../../components/ranking/ranking.component";

@Component({
  selector: 'app-competition-details',
  standalone: true,
  imports: [
    AdminLayoutComponent,
    CompetitionListComponent,
    TuiLoaderModule,
    NgIf,
    OceanComponent,
    WavesComponent,
    TuiTabsModule,
    TuiSvgModule,
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './competition-details.component.html',
  styleUrl: './competition-details.component.css'
})
export class CompetitionDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private readonly service: CompetitionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector
  ) {
  }

  activeItemIndex = 0;
  displayElement: string = "Detail";

  protected readonly Address = AddressFormatter.formatAddress;

  private dialogRefSubscription: Subscription | undefined;

  activeItem(item: string) {
    this.displayElement = item;
    this.alerts.open(item).subscribe();
  }

  onClick(item: string): void {
    this.alerts.open(item).subscribe();
  }

  CompetitionId: string = "";
  Competition: Competition = Object.create(null);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.CompetitionId = params['id'];
    });
  }

  ngAfterViewInit(): void {
    this.getCompetitionDetails();
  }

  getCompetitionDetails() {
    this.service.getCompetition(this.CompetitionId).subscribe(competition => {
      this.Competition = competition;
    });
  }

  ngOnDestroy() {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }

  showDialog() {
    this.dialogRefSubscription = this.dialogs
      .open(
        new PolymorpheusComponent(RankingComponent, this.injector),
        {
          size: 'page',
          closeable: true,
          dismissible: true,
          required: true,
        },
      )
      .subscribe();
  }
}
