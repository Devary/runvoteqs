import {Injectable} from "@angular/core";
import {SharacterData} from "../model/data-model";
import {GlobalService} from "./GlobalService"


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
  update(id: string, data: SharacterData) {
    return this.service.getClient().put<string>(this.URI+"/"+id,data);
  }

}
