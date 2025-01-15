import {Injectable} from "@angular/core";
import {SharacterData, SharacterRole} from "../../model/data-model";
import {GlobalService} from "./GlobalService"
import {Observable} from "rxjs";


@Injectable()
export class RoleService{

  INITIAL: string = "/roles";
  URI : string;

  constructor(private service : GlobalService) {
    this.URI = service.buildURI()+this.INITIAL;
  }

  getOne(id: string) {
    return this.service.getClient().get<SharacterRole>(this.URI+"/"+id);
  }
  getAll() {
    return this.service.getClient().get<SharacterRole[]>(this.URI);
  }
  create(role: SharacterRole) {
    return this.service.getClient().post<SharacterRole>(this.URI,role);
  }

  delete(id: string) {
    return this.service.getClient().delete<string>(this.URI+"/"+id);
  }
  update(data: SharacterRole) {
    console.log("update", data);
    return this.service.getClient().put<SharacterRole>(this.URI+"/"+data.id,data);
  }

}
