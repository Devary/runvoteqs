import {Injectable} from "@angular/core";
import {SharacterData, SharacterRole} from "../model/data-model";
import {GlobalService} from "./GlobalService"
import {Observable} from "rxjs";


@Injectable()
export class SharacterService{

  INITIAL: string = "/sharacters";
  URI : string;

  constructor(private service : GlobalService) {
    this.URI = service.buildURI()+this.INITIAL;
  }

  getOne(id: string) {
    return this.service.getClient().get<SharacterData>(this.URI+"/"+id);
  }
  getAll() {
    return this.service.getClient().get<SharacterData[]>(this.URI);
  }
  create(sharacter: SharacterData) {
    return this.service.getClient().post<SharacterData>(this.URI,sharacter);
  }

  delete(id: string) {
    return this.service.getClient().delete<string>(this.URI+"/"+id);
  }
  update(data: SharacterData) {
    console.log("update", data);
    return this.service.getClient().put<SharacterData>(this.URI+"/"+data.id,data);
  }
  getRoles():Observable<SharacterRole[]> {
    return this.service.getClient().get<SharacterRole[]>(this.URI+"/roles");
  }

}
