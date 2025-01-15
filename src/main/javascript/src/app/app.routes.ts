import {Routes} from '@angular/router';
import {SharacterComponent} from "./modules/sharacter/sharacter.component";
import {Empty} from "./pages/empty/empty";
import {Notfound} from "./pages/notfound/notfound";
import {RoleComponent} from "./modules/role/role.component";

export const routes: Routes = [
  {path: "sharacter", component: SharacterComponent},
  {path: "role", component: RoleComponent},
  {path: 'empty', component: Empty},
  {path: 'notfound', component: Notfound },
  {path: '**', redirectTo: '/notfound'}
];
