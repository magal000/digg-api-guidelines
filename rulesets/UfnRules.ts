import { Rule } from "@stoplight/spectral-core";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";

export class Ufn02 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.02",
  };
  given = "$.servers[?(@.url.startsWith('http'))]";
  message = "Alla API:er SKALL exponeras via HTTPS på port 443.";
  then = {
    field: 'url',
    function: pattern,
    functionOptions: {
      match: "/^https:/"
    },
  }
  severity = DiagnosticSeverity.Error;
}
export class Ufn06 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.06",
  };
  given = "$.paths[*]~";
  message = "Bokstäver i URL:n SKALL bestå av enbart gemener.";
  then = {
    function: pattern,
    functionOptions: {
      match: "^[a-z/{}]*$"
    }
  }
  severity = DiagnosticSeverity.Error;
}
export class Ufn09 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.09",
  };
  description = "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.";
  given = "$.paths[*]~";
  message = "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.";
  then = {
    function: pattern,
    functionOptions: {
      match: "^(/|[a-z0-9-.]+|{[a-zA-Z0-9_]+})+$"
    }
  }
  severity = DiagnosticSeverity.Error;
}
export class Ufn10 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.10",
  };
  description = "Understreck '_' SKALL endast användas för att separera ord i parameternamn.";
  given = "$.paths.*.*.parameters[?(@.in=='query')].name";
  message = "Understreck '_' SKALL endast användas för att separera ord i parameternamn.";
  then = {
    function: pattern,
    functionOptions: {
        notMatch: "/[-.~]/",
    }
  }
  severity = DiagnosticSeverity.Error;
}
export default { Ufn02, Ufn06,Ufn09,Ufn10 };