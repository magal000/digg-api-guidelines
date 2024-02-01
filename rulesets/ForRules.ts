import { enumeration, falsy, undefined as undefinedFunc, pattern } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"
import { oas3 } from "@stoplight/spectral-formats";
import { oas2 } from "@stoplight/spectral-formats";

/**
 * Module contains classes with functions that are need
 */
export class For01 extends BaseRuleset {
    static customProperties: CustomProperties = {
      område: "Förutsättningar",
      id: "FOR.01",
    };
    description = "Swagger 2-filer är inte tillåtna. Använd OpenAPI >= 3.0";
    message = "Swagger 2-filer är inte tillåtna. Använd OpenAPI >= 3.0";
    given = "$";
    then = {
        field: 'swagger',
        function: falsy,
    }
    
   severity = DiagnosticSeverity.Error;
  }
  export default { For01 };