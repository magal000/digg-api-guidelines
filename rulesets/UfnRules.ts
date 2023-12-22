import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";

0
export class Ufn02 implements RulesetInterface {
  given = "$.servers[?(@.url.startsWith('http'))]";
  message = "{{property}} Alla API:er SKALL exponeras via HTTPS på port 443.";
  then = {
    field: 'url',
    function: pattern,
    functionOptions: {
      match: "/^https:/"
    }
  }
  severity = DiagnosticSeverity.Error;
}
export class Ufn06 implements RulesetInterface {
  given = "$.paths[*]~";
  message = "{{property}} - Bokstäver i URL:n SKALL bestå av enbart gemener";
  then = {
    function: pattern,
    functionOptions: {
      match: "^[a-z/{}]*$"
    }
  }
  severity = DiagnosticSeverity.Error;
}
export class Ufn07 implements RulesetInterface {
  given = "$.paths[*]~";
  message = "URL:n SKALL använda tecken som är URL-säkra (tecknen A-Z, a-z, 0-9, \"-\", \".\", \"_\" samt \"~\", se vidare i RFC 3986).";
  then = {
    function: pattern,
    functionOptions: {
      match: "^[a-zA-Z0-9/\\\-\\\,\\\.\\\_\\\~{}]*$",
    }
  }
  severity = DiagnosticSeverity.Error;
}
export class Ufn09 implements RulesetInterface {
  description = "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.";
  given = "$.paths[*]~";
  message = "{{property}} --> ska vara kebab-case (gemener och separerade med ett '-').[Kategori: URL format och namngivning, Typ: SKALL INTE]";
  then = {
    function: pattern,
    functionOptions: {
      match: "^(/|[a-z0-9-.]+|{[a-zA-Z0-9_]+})+$"
    }
  }
  severity = DiagnosticSeverity.Error;
}
export class Ufn10 implements RulesetInterface {
  description = "Understreck '_' SKALL (UFN.10) endast användas för att separera ord i query parameternamn.";
  given = "$.paths.*.*.parameters[?(@.in=='query')].name";
  message = "Understreck '_' SKALL (UFN.10) endast användas för att separera ord i query parameternamn.";
  then = {
    function: pattern,
    functionOptions: {
        notMatch: "/[-.~]/",
    }
  }
  severity = DiagnosticSeverity.Error;
}
export class Ufn11 implements RulesetInterface {
  description = "Understreck '_' SKALL INTE vara del av bas URL:en.";
  given = "$.servers..url";
  message = "Understreck '_' SKALL INTE vara del av bas URL:en.";
  then = {
    field: "url",
    function: pattern,
    functionOptions: {
      notMatch: "/[_]/",
    }
  }
  severity = DiagnosticSeverity.Error;
}
export default { Ufn02, Ufn06, Ufn07, Ufn09, Ufn10, Ufn11 };
