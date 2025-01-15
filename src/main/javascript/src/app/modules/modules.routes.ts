import { Routes } from '@angular/router';
import {SharacterComponent} from "./sharacter/sharacter.component";
import {RoleComponent} from "./role/role.component";

export default [
  {path: "sharacter", component: SharacterComponent},
  {path: "role", component: RoleComponent},
  //{ path: '**', redirectTo: '/notfound' }
] as Routes;
