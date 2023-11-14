import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";


export class Sak09 implements RulesetInterface {
    description = "HTTP Basic är ett naturligt osäkert sätt att skicka inloggningsuppgifter till API:et. De placeras i URL:en i base64 som enkelt kan dekrypteras. Även om du använder en token finns det mycket bättre sätt att hantera att skicka tokens till ett API som är mindre benägna att läcka ut information";
    message = "Basic- eller Digest-autentisering SKALL INTE användas.";
    given = "$.components.securitySchemes[*]";
    then = {
      field:"scheme",
      function: pattern,
      functionOptions: {
        notMatch: "basic",
      }
    }
    severity = DiagnosticSeverity.Error;
  }  
  export default { Sak09 };