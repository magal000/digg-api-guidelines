import {undefined as undefinedFunc } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"

export class For02 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Förutsättningar",
    id: "FOR.02",
  };
  description = "EN GET -förfrågan SKALL INTE acceptera en body";
  message = "EN GET -förfrågan SKALL INTE acceptera en body";
  given = "$.paths..get.requestBody";
  then =  {
    function: undefinedFunc,
  }
    severity = DiagnosticSeverity.Error
}
export default { For02 };
