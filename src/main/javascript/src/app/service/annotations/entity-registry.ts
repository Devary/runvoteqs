import {RecognitionException} from "antlr4";

export class EntityRegistry{
  public static SHARACTER : string = "Character"
  public static ROLE : string = "Role"


  public static getByName(name: string): EntityRegistry {
    let _name = name.toLowerCase()
    switch (_name) {
      case "role": return this.ROLE
      case "sharacter": return this.SHARACTER
      default : throw new SyntaxError("Cannot determine entity name");
    }
  }

}
