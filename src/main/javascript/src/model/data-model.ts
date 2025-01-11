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
    desc:string;
    role:string;
    title:string;
    image:string;
}

export class SharacterDataImpl{
  id= "";
  name= "";
  title= "";
  image= "";
  desc= "";
  role= "";
}

export class Sharacter implements TreeNode{
    label?: string;
    type?: string;
    styleClass?: string;
    expanded?: any;
    data?: any;
    children?: TreeNode[];

}
