import {Routes} from '@angular/router';
import {SharacterComponent} from "./sharacter/sharacter.component";
import {Empty} from "./pages/empty/empty";
import {Notfound} from "./pages/notfound/notfound";

export const routes: Routes = [
  {path: "sharacter", component: SharacterComponent},
  {path: 'empty', component: Empty},
  {path: 'notfound', component: Notfound },
  {path: '**', redirectTo: '/notfound'}
];
