import { Component } from '@angular/core';
import {EntityContext} from "../../context/EntityContext";
import {ContextService} from "../../service/ContextService";
import {TableField} from "../../context/models/TableField";
import {TableFieldType} from "../../context/models/TableFieldType";
import {DynamicTableComponent} from "../dynamic/dynamic-table/dynamic-table.component";

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
    var roles: TableField = new TableField("sharacters", TableFieldType.MULTI_SELECT, "sharacter");
    _fields.push(name, description, roles)
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
