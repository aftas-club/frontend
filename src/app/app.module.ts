import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Range} from "./utils/range";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {CloudinaryModule} from '@cloudinary/ng';
import {TUI_SANITIZER} from "@taiga-ui/core";
import {ALL_TAIGA_UI_MODULES} from "./config/all-taiga-modules";
import {GoogleMapsModule} from "@angular/google-maps";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {authInterceptorInterceptor} from "./core/interceptors/auth-interceptor.interceptor";
import {CsrfInterceptor} from "./core/interceptors/csrf-interceptor.interceptor";


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
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true}
  ],
})
export class AppModule {
}
