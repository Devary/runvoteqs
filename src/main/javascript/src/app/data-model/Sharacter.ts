import {SharacterRole} from "./SaharacterRole";
import {Anime} from "./Anime";

export interface Sharacter {
  id:string;
  name:string;
  description:string;
  roles:SharacterRole[];
  animeUuid:Anime;
  anime:Anime;
  _deleted:boolean;
}
