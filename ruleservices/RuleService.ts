import { RuleInterface } from "../ruleinterface/RuleInterface.ts"

export class RuleService implements RuleInterface {
    public given: string;
    public message: string;
    public field: string;
    public match: string;
     
       constructor(given: string, message: string, field: string, match: string){
         this.given = given;
         this.message = message;
         this.field = field;
         this.match = match;
     }
 
 }
export default {};
