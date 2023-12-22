import {NgModule} from '@angular/core';
import {CommonModule, provideCloudinaryLoader} from '@angular/common';
import {Range} from "./utils/range";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {CloudinaryModule} from '@cloudinary/ng';
import {TUI_SANITIZER} from "@taiga-ui/core";
import {ALL_TAIGA_UI_MODULES} from "./config/all-taiga-modules";
import {GoogleMapsModule} from "@angular/google-maps";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CloudinaryModule,
    GoogleMapsModule,
    ...ALL_TAIGA_UI_MODULES
  ],
  providers: [
    Range,
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
  ],
})
export class AppModule {
}
