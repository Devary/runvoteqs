import {Observable} from "rxjs";
import {SHARS_NOT_RELATED_TO_ANIME} from "./annotations/CustomCall";
import {Sharacter} from "../data-model/Sharacter";
import {Injectable} from "@angular/core";
import {WebClientService} from "./web-client.service";


@Injectable()
export class CustomCallService {

  URI : string;

  constructor(private service : WebClientService) {
    this.URI = service.buildURI();

  }

  // @ts-ignore
  custom(call:string): Observable<any> {
    switch (call){
      case SHARS_NOT_RELATED_TO_ANIME : return this.service.getClient().get<Sharacter>(this.URI+"/sharacters/wa/");
    }
  }

}
