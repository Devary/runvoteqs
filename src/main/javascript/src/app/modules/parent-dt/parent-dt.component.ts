import {Component} from '@angular/core';
import {DynamicTableComponent} from "../dynamic/dynamic-table/dynamic-table.component";
import {TableModule} from "primeng/table";
import {EntityContext} from "../../context/EntityContext";
import {TableField} from "../../context/models/TableField";
import {TableFieldType} from "../../context/models/TableFieldType";
import {TableAction} from "../../context/models/TableAction";

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
    this.sharacterContext= new EntityContext(this.createContextScheme(
      "sharacter",
      _fields,
      true,
      [],
      true,
      [],
      ['id']));
  }


  private generateAnimeContext(){
    let _fields:TableField[]=[];
    var name : TableField= new TableField("name",TableFieldType.INPUT_TEXT);
    var description : TableField= new TableField("description",TableFieldType.TEXT_EDITOR,);
    var roles : TableField= new TableField("sharacters",TableFieldType.MULTI_SELECT,"sharacter");
    _fields.push(name,description,roles)
    this.animeContext= new EntityContext(this.createContextScheme(
     "anime",
      _fields,
     true,
     [],
     true,
     [],
     ['id']
    ));
  }

  private generateRoleContext(){
    let _fields:TableField[]=[];
    var name : TableField= new TableField("name",TableFieldType.INPUT_TEXT);
    var description : TableField= new TableField("description",TableFieldType.TEXT_EDITOR,);
    _fields.push(name,description)
    this.roleContext= new EntityContext(this.createContextScheme(
      "role",
      _fields,
      true,
      [],
      true,
      [],
      ['id']
    ));
  }

  createContextScheme(name:string,_fields : TableField[],allowActions:boolean,allowedActions:TableAction[],allowExportAction:boolean,disabledActions:string[],disableFields:string[]){
    this.validateSchema();
    return {
      name: name,
      fields: _fields,
      allowActions: allowActions,
      allowedActions: allowedActions,
      allowExportAction: allowExportAction,
      disabledActions: disabledActions,
      disableFields: disableFields
    };
  }
  validateSchema():void{
    //todo: make all possible validations
  }
}
