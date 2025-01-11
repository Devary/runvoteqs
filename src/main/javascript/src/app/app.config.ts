import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import {SharacterService} from "../service/SharacterService";
import {GlobalService} from "../service/GlobalService";
import {providePrimeNG} from "primeng/config";
import Lara from '@primeng/themes/lara';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
    theme: {
      preset: Lara
      }
    }),
    SharacterService,
    GlobalService],
};
