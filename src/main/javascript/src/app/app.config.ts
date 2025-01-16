import { ApplicationConfig } from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import {SharacterService} from "./service/SharacterService";
import {WebClientService} from "./service/web-client.service";
import {providePrimeNG} from "primeng/config";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import Aura from "@primeng/themes/aura";
import {RoleService} from "./service/RoleService";
import {MessageTemplateService} from "./service/MessageTemplateService";
import {MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    SharacterService,
    RoleService,
    MessageTemplateService,
    MessageService,
    WebClientService]
};

export const tablePageSize: number = 7;
export const messageLife: number = 3000;
