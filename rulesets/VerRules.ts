import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"


export class Ver06 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Versionhantering",
    id: "VER.06",
  };
  given = "$.paths";
  message = "Information om ett API SKALL tillgängliggöras via resursen api-info under roten '/' till API:et.";
  then = {
    field: '/api-info',
    function: truthy,
  }
  severity = DiagnosticSeverity.Error;
}
export default { Ver06 };
