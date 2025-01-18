import {Injectable} from "@angular/core";
import {AnimeData} from "../../model/data-model";
import {WebClientService} from "./web-client.service"


@Injectable()
export class AnimeService{

  INITIAL: string = "/animes";
  URI : string;

  constructor(private service : WebClientService) {
    this.URI = service.buildURI()+this.INITIAL;
  }

  getOne(id: string) {
    return this.service.getClient().get<AnimeData>(this.URI+"/"+id);
  }
  getAll() {
    return this.service.getClient().get<AnimeData[]>(this.URI);
  }
  create(anime: AnimeData) {
    return this.service.getClient().post<AnimeData>(this.URI,anime);
  }

  delete(id: string) {
    return this.service.getClient().delete<string>(this.URI+"/"+id);
  }
  update(data: AnimeData) {
    console.log("update", data);
    return this.service.getClient().put<AnimeData>(this.URI+"/"+data.id,data);
  }
}
