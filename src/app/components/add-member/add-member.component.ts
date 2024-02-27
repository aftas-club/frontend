import {ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiFileLike,
  TuiInputDateModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {
  TuiAlertService,
  TuiDialogCloseService,
  TuiDialogContext,
  TuiDialogModule,
  TuiErrorModule,
  tuiFadeIn,
  TuiHintModule,
  tuiSlideInTop,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {Observable, of, Subject, timer} from 'rxjs';
import {finalize, map, switchMap} from 'rxjs/operators';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {AsyncPipe, NgIf} from "@angular/common";
import {OceanComponent} from "../../shared/ocean/ocean.component";
import {WavesComponent} from "../../shared/waves/waves.component";
import {TuiDestroyService} from "@taiga-ui/cdk";
import {MemberService} from "../../core/services/member.service";
import {IdentityDocumentType} from "../../core/enum/identity-document-type";
import {Gender} from "../../core/enum/gender";
import {Member} from "../../core/model/member";

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiHintModule,
    TuiInputDateModule,
    TuiInputFilesModule,
    NgIf,
    AsyncPipe,
    TuiDialogModule,
    FormsModule,
    OceanComponent,
    WavesComponent,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule
  ],
  templateUrl: './add-member.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService, TuiDialogCloseService],
  animations: [tuiSlideInTop, tuiFadeIn],
})
export class AddMemberComponent implements OnInit {
  @Output() member = new EventEmitter<Member>();
  readonly control = new FormControl();

  addMemberForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    familyName: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    birthDate: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    accessionDate: new FormControl(null, Validators.required),
    nationality: new FormControl(null, Validators.required),
    identityDocument: new FormControl(null, Validators.required),
    identityNumber: new FormControl(null, Validators.required),
    image: new FormControl(),
  });

  notReadyToSubmit = false;
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap(file => (file ? this.makeRequest(file) : of(null))),
  );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private memberService: MemberService
  ) {
  }

  ngOnInit(): void {
    this.context.$implicit.next(true);
  }

  get isButtonDisabled(): boolean {
    return this.notReadyToSubmit || this.addMemberForm.invalid;
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.control.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);
    return timer(300).pipe(
      map(() => {
        return file;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );
  }

  close(): void {
    this.context.completeWith(false);
  }

  addMember() {
    try {
      if (this.addMemberForm.invalid) {
        this.addMemberForm.markAllAsTouched();
        this.alerts.open('', {
          label: 'Please enter all fields',
          status: 'warning',
          autoClose: true,
        }).subscribe();
        return;
      }

      this.notReadyToSubmit = true;
      const memberData = this.addMemberForm.value;
      const member: Member = {
        firstname: memberData.name,
        lastname: memberData.familyName,
        birthDate: memberData.birthDate,
        email: memberData.email,
        gender: memberData.gender,
        accessionDate: memberData.accessionDate,
        nationality: memberData.nationality,
        identityDocument: memberData.identityDocument,
        identityNumber: memberData.identityNumber,
        image: '',
      };

      this.memberService.createMember(member).subscribe(
        (createdMember) => {
          this.alerts.open('', {
            label: `Member ${createdMember.firstname} ${createdMember.lastname} created successfully`,
            status: 'success',
            autoClose: true,
          }).subscribe();
          this.close();
          this.member.emit(createdMember);
          const event = new CustomEvent("createdMember", {detail: createdMember});
          window.dispatchEvent(event);
        },
        (error) => {
          console.error(error?.error?.message);
          this.alerts.open('', {
            label: error?.error?.message.toString(),
            status: 'error',
            autoClose: true,
          }).subscribe();
        },
        () => {
          this.notReadyToSubmit = false;
        }
      );
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

  readonly Gender = Gender;
  readonly IdentityDocumentType = IdentityDocumentType;
  readonly Object = Object;
}
