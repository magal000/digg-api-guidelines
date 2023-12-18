import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";


export class Dok23 implements RulesetInterface {
  given = "$.servers[*].url";
  message = "API specifikationen SKALL återfinnas under API-roten";
  then = {
    field: "url",
    function: pattern,
    functionOptions: {
      match: "^[a-z]+://(?:[a-z0-9\-.]+\.)+([a-z]{2,6})(?:\/[a-z0-9-]+/[a-z0-9-]+)?$"
        }
    }
    severity = DiagnosticSeverity.Error; 

}
export default { Dok23 };