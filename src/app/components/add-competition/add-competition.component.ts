import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {OceanComponent} from "../../shared/ocean/ocean.component";
import {WavesComponent} from "../../shared/waves/waves.component";
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDialogContext,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
  TuiCarouselModule,
  tuiCreateTimePeriods,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputTimeModule,
  tuiInputTimeOptionsProvider,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {TuiMoneyModule} from "@taiga-ui/addon-commerce";
import {GoogleMapsModule} from "@angular/google-maps";
import {GoogleMapComponent} from "../../shared/google-map/google-map.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CompetitionService} from "../../core/services/competition.service";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiTime} from "@taiga-ui/cdk";

@Component({
  selector: 'app-add-competition',
  standalone: true,
  imports: [
    OceanComponent,
    WavesComponent,
    TuiButtonModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiMoneyModule,
    TuiLoaderModule,
    TuiMarkerIconModule,
    GoogleMapsModule,
    GoogleMapComponent,
    AsyncPipe,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    TuiDataListWrapperModule,
    TuiInputDateModule,
    TuiInputFilesModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiInputTimeModule,
    TuiInputNumberModule,
    TuiErrorModule,
    TuiHintModule,
    TuiFieldErrorPipeModule,
    TuiGroupModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiInputTimeOptionsProvider({
      mode: 'HH:MM:SS',
      itemSize: 's',
    }),
  ],
  templateUrl: './add-competition.component.html',
  styleUrl: './add-competition.component.css'
})
export class AddCompetitionComponent {

  constructor(
    private readonly service: CompetitionService,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {
  }

  protected readonly Object = Object;
  timeRange = tuiCreateTimePeriods();

  addCompetitionForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.min(0)]),
    numberOfParticipants: new FormControl(0, [Validators.required, Validators.min(0)]),
    street: new FormControl(null, Validators.required),
    region: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required)
  });

  notReadyToSubmit = false;

  get isButtonDisabled(): boolean {
    return this.notReadyToSubmit || this.addCompetitionForm.invalid;
  }

  formatSecond(second: TuiTime | null | undefined) {
    return second?.toString() + ":00";
  }

  addCompetition() {
    console.log(this.formatSecond(this.addCompetitionForm.value.startTime));
    try {
      if (this.addCompetitionForm.invalid) {
        this.addCompetitionForm.markAllAsTouched();
        this.alerts.open('', {
          label: 'Please enter all fields',
          status: 'warning',
          autoClose: true,
        }).subscribe();
        return;
      }
      this.service.createCompetition(
        {
          title: this.addCompetitionForm.value.title,
          date: this.addCompetitionForm.value.date,
          startTime: this.formatSecond(this.addCompetitionForm.value.startTime),
          endTime: this.formatSecond(this.addCompetitionForm.value.endTime),
          amount: this.addCompetitionForm.value.amount,
          numberOfParticipants: this.addCompetitionForm.value.numberOfParticipants,
          address: {
            street: this.addCompetitionForm.value.street,
            region: this.addCompetitionForm.value.region,
            city: this.addCompetitionForm.value.city
          }
        }
      ).subscribe(competition => {
          console.log(competition)
          this.alerts.open('', {
            label: 'Competition created successfully',
            status: 'success',
            autoClose: true,
          }).subscribe();
          this.context.completeWith(true);
        },
        (error) => {
          console.error(error?.error?.message);
          this.alerts.open('', {
            label: error?.error?.message.toString(),
            status: 'error',
            autoClose: true,
          }).subscribe();
        });
    } catch (error) {
      console.log(error);
      this.alerts.open('', {
        label: 'Error creating member',
        status: 'error',
        autoClose: true,
      }).subscribe();
      this.notReadyToSubmit = false;
    }
  }
}
