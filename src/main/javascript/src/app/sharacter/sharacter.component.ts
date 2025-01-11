import {Component, OnInit} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {SharacterService} from "../../service/SharacterService";
import {FormsModule} from "@angular/forms";
import {SharacterData, SharacterDataImpl} from "../../model/data-model";
import {Button} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {NgClass} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";

export class Anime {
  name : string | undefined;
}

export class Sharacter {
  name: string | undefined ;
  //anime:Anime = [];
}



@Component({
  selector: 'app-sharacter',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    Button,
    MultiSelectModule,
    DropdownModule,
    NgClass,
    InputTextModule,
    IconField,
    InputIcon
  ],
  templateUrl: './sharacter.component.html',
  styleUrl: './sharacter.component.scss'
})
export class SharacterComponent implements OnInit{
    ngOnInit(): void {
        this.sharacters = [];
    }
  sharacters : SharacterData[] = [];
    //todo::implement forms
  sharacter: SharacterData= new SharacterDataImpl();

  constructor(private sharacterService: SharacterService) {
    this.refreshTable();
  }

  protected create() {
    this.sharacterService.create(this.sharacter).subscribe(data => this.sharacters.push(data));
  }

  delete(id :string) {
    this.sharacterService.delete(id).subscribe(data => console.log("deleted"));
    this.refreshTable();
  }

  refreshTable(){
    this.sharacterService.getAll().subscribe(data => this.sharacters = data);
  }

  clear(dt1: Table) {
    dt1.clear();
  }
}
