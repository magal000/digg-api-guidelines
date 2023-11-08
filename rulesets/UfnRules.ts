import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";



export class Ufn02 implements RulesetInterface {
  given = "$.servers[?(@.url.startsWith('http'))]";
  message = "{{property}} Alla API:er SKALL exponeras via HTTPS på port 443.";
  then = {
    field: 'url',
    function: pattern,
    functionOptions: {
      match: '^(https)://(.*)$'
    }
  }
}
export class Ufn05 implements RulesetInterface {
  description = 'En URL BÖR INTE vara längre än 2048 tecken.';
  given = "$.servers[?(@.url.startsWith('http'))]";
  message = "$.paths[*]~";
  then = {
    function: pattern,
    functionOptions: {
      match: '^(?=.{1,2048}$).*'
    }
  }
}
export default { Ufn02, Ufn05 };
