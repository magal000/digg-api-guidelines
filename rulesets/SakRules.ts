import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"

export class Sak09 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Säkerhet",
    id: "SAK.09",
  };
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
export class Sak10 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Säkerhet",
    id: "SAK.10",
  };
  description = "enom att använda HTTPS för att kryptera kommunikationen mellan klient och server kan Bearer Authentication erbjuda en hög nivå av säkerhet. Det gör det svårare för angripare att avlyssna eller ändra åtkomsttoken under överföringen";
  message = "Authorization: Bearer header SKALL användas för autentisering/auktorisation.";
  given = "$.components.securitySchemes[*]";
  then = {
    field:"scheme",
    function: pattern,
    functionOptions: {
      match: "bearer",
    }
  }
  severity = DiagnosticSeverity.Error;
  }  
 export default { Sak09,Sak10 };