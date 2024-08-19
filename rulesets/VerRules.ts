import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";


export class Ver06 implements RulesetInterface {
  given = "$.paths";
  message = "Information om ett API SKALL tillgängliggöras via resursen api-info under roten till API:et.";
  then = {
    field: '/api-info',
    function: truthy,
  }
  severity = DiagnosticSeverity.Error;
}
export default { Ver06 };
