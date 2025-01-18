import { Component } from '@angular/core';
import {SharacterComponent} from "../sharacter/sharacter.component";
import {RoleComponent} from "../role/role.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    SharacterComponent,
    RoleComponent
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
