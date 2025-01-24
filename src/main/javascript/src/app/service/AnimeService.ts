import {Injectable} from "@angular/core";
import {WebClientService} from "./web-client.service"
import {Anime} from "../data-model/Anime";


@Injectable()
export class AnimeService{

  INITIAL: string = "/animes";
  URI : string;

  constructor(private service : WebClientService) {
    this.URI = service.buildURI()+this.INITIAL;
  }

  getOne(id: string) {
    return this.service.getClient().get<Anime>(this.URI+"/"+id);
  }
  getAll() {
    return this.service.getClient().get<Anime[]>(this.URI);
  }
  create(anime: Anime) {
    return this.service.getClient().post<Anime>(this.URI,anime);
  }

  delete(id: string) {
    return this.service.getClient().delete<string>(this.URI+"/"+id);
  }
  update(data: Anime) {
    console.log("update", data);
    return this.service.getClient().put<Anime>(this.URI+"/"+data.id,data);
  }
}
