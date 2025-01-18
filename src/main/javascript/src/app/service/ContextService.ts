import {TableContext} from "../context/TableContext";
import {RoleService} from "./RoleService";
import {Injectable} from "@angular/core";
import {SharacterService} from "./SharacterService";


@Injectable()
export class ContextService {
  private _roleTableContext:TableContext;
  private _sharacterTableContext:TableContext;

  constructor(private roleService:RoleService,private sharacterService:SharacterService) {
    this._roleTableContext = this.generateContextFor(RoleService.name);
    this._sharacterTableContext = this.generateContextFor(SharacterService.name);
  }

  generateContextFor(service:string) : TableContext{
      let context : TableContext = new TableContext();
      if (service == "_RoleService") {
        context.service = this.roleService;
      }else if (service == "_SharacterService") {
        context.service = this.sharacterService;
      }else{
        throw new SyntaxError("Cannot determine service name");
      }
      return context;
  }

  public getTableContextFor(name:string): TableContext {
    switch (name){
      case "role": return this.roleTableContext;
      case "sharacter": return this.sharacterTableContext;
      default: throw new SyntaxError("Cannot determine entity name");
    }
  }


  get roleTableContext(): TableContext {
    return this._roleTableContext;
  }
  get sharacterTableContext(): TableContext {
    return this._sharacterTableContext;
  }


}
