import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {EntityContext} from "../../context/EntityContext";
import {TableField} from "../../context/models/TableField";
import {TableFieldType} from "../../context/models/TableFieldType";
import {ContextService} from "../../service/ContextService";
import {DynamicTableComponent} from "../dynamic/dynamic-table/dynamic-table.component";


@Component({
  selector: 'app-sharacter',
  standalone: true,
  imports: [
    DynamicTableComponent

  ],
  templateUrl: './sharacter.component.html',
  styleUrl: './sharacter.component.scss',
  outputs: ['message','visibleConfirmation'],
  providers: [ConfirmationService, MessageService]
})
export class SharacterComponent {

  context!:EntityContext;

  constructor(private contextService:ContextService) {
    let _fields:TableField[]=[];
    var name : TableField= new TableField("name",TableFieldType.INPUT_TEXT);
    var description : TableField= new TableField("description",TableFieldType.TEXT_EDITOR,);
    var roles : TableField= new TableField("roles",TableFieldType.MULTI_SELECT,"role",[]);
    var anime : TableField= new TableField("anime",TableFieldType.SELECT,"anime");
    _fields.push(name,description,roles,anime)
    this.context= new EntityContext(this.contextService.createContextScheme(
      "sharacter",
      _fields,
      true,
      [],
      true,
      [],
      ['id']));
  }
}
