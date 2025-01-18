import {TableFieldType} from "./TableFieldType";

export class TableField {
  name: string;
  type: TableFieldType;
  listType?: string; ///object Type in case of the type is multiselect
  listObjects?: any[]; ///object Type in case of the type is multiselect

  constructor(name: string, type: TableFieldType, listType?: string) {
    this.name = name;
    this.type = type;
    this.listType = listType;
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
}
