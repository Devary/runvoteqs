import {Routes} from '@angular/router';
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {AppLayout} from "./layout/component/app.layout";

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'modules', component: DashboardComponent },
      { path: 'modules', loadChildren: () => import('./modules/modules.routes') }
    ]
  }
];
