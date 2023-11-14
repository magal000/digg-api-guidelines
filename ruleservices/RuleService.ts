import { RuleInterface} from "../ruleinterface/RuleInterface.ts"

export class RuleService implements RuleInterface {
    public given: string;
    public message: string;
    public field: string;
    public match: string;
    public severity: number;
/*
    constructor(given: string, message: string, field: string, match: string, severity: string) {
        this.given = given;
        this.message = message;
        this.field = field;
        this.match = match;
        this.severity = severity;
    }
*/
    constructor(given: string, message: string, field: string, match: string, severity: number) {
        this.given = given;
        this.message = message;
        this.field = field;
        this.match = match;
        this.severity = severity;
    }
}
export default {};
