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
import {ContextService} from "./service/ContextService";
import {AnimeService} from "./service/AnimeService";
import {DialogService} from "primeng/dynamicdialog";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    SharacterService,
    RoleService,
    AnimeService,
    MessageTemplateService,
    MessageService,
    WebClientService,
    ContextService,
    DialogService,
  ]
};

export const tablePageSize: number = 5;
export const messageLife: number = 3000;
