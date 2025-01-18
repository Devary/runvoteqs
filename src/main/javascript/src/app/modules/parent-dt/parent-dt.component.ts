import {Component, OnInit} from '@angular/core';
import {DynamicTableComponent} from "../dynamic/dynamic-table/dynamic-table.component";
import {Table, TableModule} from "primeng/table";
import {EntityContext} from "../../context/EntityContext";
import {TableField} from "../../context/models/TableField";
import {Sharacter, SharacterData, SharacterDataImpl, SharacterRole} from "../../../model/data-model";
import {EditorModule} from "primeng/editor";
import {Tab} from "primeng/tabs";
import {TableFieldType} from "../../context/models/TableFieldType";

@Component({
  selector: 'app-parent-dt',
  imports: [
    DynamicTableComponent,
    TableModule
  ],
  templateUrl: './parent-dt.component.html',
  standalone: true,
  styleUrl: './parent-dt.component.scss'
})
export class ParentDtComponent {
  roleContext!:EntityContext;
  sharacterContext!:EntityContext;
  animeContext!: EntityContext;

  constructor(){
    this.generateRoleContext();
    this.generateSharacterContext();
    this.generateAnimeContext();
  }

  private generateSharacterContext(){
    //init fields
    let _fields:TableField[]=[];
    var name : TableField= new TableField("name",TableFieldType.INPUT_TEXT);
    var description : TableField= new TableField("description",TableFieldType.TEXT_EDITOR,);
    var roles : TableField= new TableField("roles",TableFieldType.MULTI_SELECT,"role");
    _fields.push(name,description,roles)
    //init component
    var init ={
      name: "sharacter",
      fields: _fields,
      allowActions: true,
      allowedActions: [],
      allowExportAction: true,
      disabledActions: [],
      disableFields: ['id']
    }
    this.sharacterContext= new EntityContext(init);
  }


  private generateAnimeContext(){
    let _fields:TableField[]=[];
    var name : TableField= new TableField("name",TableFieldType.INPUT_TEXT);
    var description : TableField= new TableField("description",TableFieldType.TEXT_EDITOR,);
    var roles : TableField= new TableField("sharacters",TableFieldType.MULTI_SELECT,"sharacter");
    _fields.push(name,description,roles)
    var init ={
      name: "anime",
      fields: _fields,
      allowActions: true,
      allowedActions: [],
      allowExportAction: true,
      disabledActions: [],
      disableFields: ['id']
    }
    this.animeContext= new EntityContext(init);
  }




  private generateRoleContext(){
    let _fields:TableField[]=[];
    var name : TableField= new TableField("name",TableFieldType.INPUT_TEXT);
    var description : TableField= new TableField("description",TableFieldType.TEXT_EDITOR,);
    _fields.push(name,description)
    var init ={
      name: "role",
      fields: _fields,
      allowActions: true,
      allowedActions: [],
      allowExportAction: true,
      disabledActions: [],
      disableFields: ['id']
    }
    this.roleContext= new EntityContext(init);
  }
}
