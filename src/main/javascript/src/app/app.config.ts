import { ApplicationConfig } from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import {SharacterService} from "./service/SharacterService";
import {GlobalService} from "./service/GlobalService";
import {providePrimeNG} from "primeng/config";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import Aura from "@primeng/themes/aura";
import {RoleService} from "./service/RoleService";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    SharacterService,
    RoleService,
    GlobalService]
};

export const tablePageSize: number = 7;
