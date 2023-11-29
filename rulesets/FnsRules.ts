import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";


export class Fns01 implements RulesetInterface {
    description = "Parameternamn SKALL anges med en konsekvent namnkonvention inom ett API, exempelvis antingen snake_case eller camelCase";
    message = "{{property}}--> Parameternamn SKALL anges med en konsekvent namnkonvention exempelvis antingen snake_case eller camelCase";
    given = "$.paths...parameters[?(@.in=='query')].name";
    then = {
      function: pattern,
      functionOptions: {
      match:  "^([a-z]+[A-Z]+\\w+)+|^[a-z]+(?:_[a-z]+)*$"
      }
    }
  severity = DiagnosticSeverity.Error;
  }
export default { Fns01 };