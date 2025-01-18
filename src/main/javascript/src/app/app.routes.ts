import {Routes} from '@angular/router';
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {AppLayout} from "./layout/component/app.layout";
import {DynamicTableComponent} from "./modules/dynamic/dynamic-table/dynamic-table.component";
import {ParentDtComponent} from "./modules/parent-dt/parent-dt.component";

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'modules', component: DashboardComponent },
      { path: 'modules', loadChildren: () => import('./modules/modules.routes') }
    ]
  },
  { path: 'dyn', component: DynamicTableComponent },
  { path: 'par', component: ParentDtComponent }
];
