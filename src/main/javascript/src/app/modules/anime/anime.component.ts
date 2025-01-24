import { Component } from '@angular/core';
import {EntityContext} from "../../context/EntityContext";
import {ContextService} from "../../service/ContextService";
import {TableField} from "../../context/models/TableField";
import {TableFieldType} from "../../context/models/TableFieldType";
import {DynamicTableComponent} from "../dynamic/dynamic-table/dynamic-table.component";
import {Sharacter} from "../../data-model/Sharacter";
import {SHARS_NOT_RELATED_TO_ANIME} from "../../service/annotations/CustomCall";
import {ObjectFilter} from "../../context/models/ObjectFilter";

@Component({
  selector: 'app-anime',
  imports: [
    DynamicTableComponent
  ],
  templateUrl: './anime.component.html',
  standalone: true,
  styleUrl: './anime.component.scss'
})
export class AnimeComponent {
  context!:EntityContext;

  constructor(private contextService:ContextService) {
    let _fields: TableField[] = [];
    var name: TableField = new TableField("name", TableFieldType.INPUT_TEXT);
    var description: TableField = new TableField("description", TableFieldType.TEXT_EDITOR,);

    let sharacterFilter = new ObjectFilter("delete","_deleted",true);
    var sharacters: TableField = new TableField("sharacters", TableFieldType.MULTI_SELECT, "sharacter", [],SHARS_NOT_RELATED_TO_ANIME,sharacterFilter);
    //personalize output in the multiselect sharacter
    //override the future value
    let shars:Sharacter[] = []


    _fields.push(name, description, sharacters)



    this.context = new EntityContext(this.contextService.createContextScheme(
      "anime",
      _fields,
      true,
      [],
      true,
      [],
      ['id']
    ));

  }
}
