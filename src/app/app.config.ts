import {provideAnimations} from "@angular/platform-browser/animations";
import {TuiRootModule} from "@taiga-ui/core";
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {AppModule} from "./app.module";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AppModule,
      CommonModule,
      HttpClientModule,
      TuiRootModule
    ),
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration()
  ]
};
