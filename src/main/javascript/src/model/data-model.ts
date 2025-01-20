import {TreeNode} from "primeng/api";
import {Tree} from "primeng/tree";

export interface SinglePoll {
    pollId: number;
    pollName: string;
    description: string;
    data:Sharacter;
}

export interface SharacterData {
    id:string;
    name:string;
    description:string;
    roles:SharacterRole[];
}

export class SharacterDataImpl{
  id= "";
  name= "";
  description= "";
  roles:SharacterRole[]= [];
  anime:AnimeData= new AnimeData();
}

export class Sharacter implements TreeNode{
    label?: string;
    type?: string;
    styleClass?: string;
    expanded?: any;
    data?: any;
    children?: TreeNode[];

}
export interface SharacterRole {
  id : string;
  name: string;
  description: string;
  meta: Map<string,any>;
}
export class SharacterRoleImpl {
  id = "";
  name= "";
  description = "";
  test = "";
  meta = new Map<string,any>();
}
export class AnimeData{
  id= "";
  name= "";
  description= "";
  sharacters:SharacterDataImpl[]= [];
}
