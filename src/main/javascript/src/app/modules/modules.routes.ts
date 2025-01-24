import { Routes } from '@angular/router';
import {SharacterComponent} from "./sharacter/sharacter.component";
import {RoleComponent} from "./role/role.component";
import {AnimeComponent} from "./anime/anime.component";
import {GenerateSpComponent} from "./generate-sp/generate-sp.component";

export default [
  {path: "sharacter", component: SharacterComponent},
  {path: "role", component: RoleComponent},
  {path: "anime", component: AnimeComponent},
  {path: "single-poll", component: GenerateSpComponent},
  //{ path: '**', redirectTo: '/notfound' }
] as Routes;
