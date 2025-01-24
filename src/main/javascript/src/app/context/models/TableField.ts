import {TableFieldType} from "./TableFieldType";
import {ObjectFilter} from "./ObjectFilter";

export class TableField {
  name: string;
  type: TableFieldType;
  listType?: string; ///object Type in case of the type is multiselect
  listObjects?: any[]; ///object Type in case of the type is multiselect
  customCall?: String; ///object Type in case of the type is multiselect
  fieldObjectsFilter?: ObjectFilter;

  constructor(name: string, type: TableFieldType, listType?: string,listObjects?: any[],customCall?:string,fieldObjectsFilter?: ObjectFilter) {
    this.name = name;
    this.type = type;
    this.listType = listType;
    this.listObjects = listObjects;
    this.customCall = customCall;
    this.fieldObjectsFilter = fieldObjectsFilter;
  }

  get isMultiSelect(){
    return this.type === TableFieldType.MULTI_SELECT;
  }
  get isTextEditor(){
    return this.type === TableFieldType.TEXT_EDITOR;
  }
  get isInputText(){
    return this.type === TableFieldType.INPUT_TEXT;
  }
  public setListObjects(listObjects:any[]){
    this.listObjects = listObjects;
  }

  get isSelect(){
    return this.type === TableFieldType.SELECT;
  }
}
