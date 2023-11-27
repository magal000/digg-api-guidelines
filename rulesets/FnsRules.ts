import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";


export class Fns01 implements RulesetInterface {
    description = "Parameternamn SKALL anges med en konsekvent namnkonvention inom ett API, exempelvis antingen snake_case eller camelCase";
    message = "{{property}}--> Parameternamn SKALL anges med en konsekvent namnkonvention exempelvis antingen snake_case eller camelCase";
    given = "$.parameter[*]~";
    then = {
      function: pattern,
      functionOptions: {
      match: "\{([a-z]+[_a-z][a-z_]+)*\}+|(\{([a-z]+[A-Z][a-z]+)*\})",
      }
    }
  severity = DiagnosticSeverity.Error;
  }
export default { Fns01 };