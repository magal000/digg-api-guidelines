import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema, casing } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"


export class Fns01 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Filtrering, paginering och sökparametrar",
    id: "FNS.01",
  };
  description = "Parameternamn SKALL anges med en konsekvent namnkonvention inom ett API, exempelvis antingen snake_case eller camelCase.";
  message = "Parameternamn SKALL anges med en konsekvent namnkonvention exempelvis antingen snake_case eller camelCase";
  given = "$.paths.*.*.parameters[?(@.in=='query')].name";
  then = {
    function: pattern,
    functionOptions: {
      match: "^(?:[a-z0-9]+(?:_[a-z0-9]+)*|[a-z]+(?:[A-Z][a-z]*)*)$"
    }
  }
  severity = DiagnosticSeverity.Error;
}

export class Fns03 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Filtrering, paginering och sökparametrar",
    id: "FNS.03",
  };
  description = "Sökparametrar SKALL starta med en bokstav";
  message = "Sökparametrar SKALL starta med en bokstav.";
  given = "$.paths.*.*.parameters[?(@.in=='query')].name";
  then = {
    function: pattern,
    functionOptions: {
      match: "^[a-zA-Z].*$"
    }
  }
  severity = DiagnosticSeverity.Error;
}

export class Fns09 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Filtrering, paginering och sökparametrar",
    id: "FNS.09",
  };
  description = "Defaultvärde för limit BÖR vara 20";
  message = "Defaultvärde för limit BÖR vara 20";
  given = "$.paths..parameters";
  then = {
    function: (targetVal, _opts, paths) => {

      let isValid = true;
      targetVal.forEach(function (item, index) {
        if (item["in"] == "query" &&
          (item["name"] == "page" || item["name"] == "offset")) {

          // check for existense of 'limit' parameter
          const limit = targetVal.find(param => param.name === 'limit');
          if (limit) {
            if (limit.schema.default != 20) {
              isValid = false;
            } else {
              isValid = true;
            }
          } else {
            isValid = true;
          }
        }
      });

      if (!isValid) {
        return [
          {
            message: this.message,
            severity: this.severity
          }
        ];
      } else {
         return []
      }
    }
  }
  severity = DiagnosticSeverity.Warning;
}

export class Fns06 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Filtrering, paginering och sökparametrar",
    id: "FNS.06",
  };
  description = "Sökparametrar BÖR använda tecken som är URL-säkra (tecknen A-Z, a-z, 0-9, '-'', '.', '_' samt '~', se vidare i RFC 3986)";
  message = "Sökparametrar BÖR använda tecken som är URL-säkra (tecknen A-Z, a-z, 0-9, '-', '.', '_' samt '~', se vidare i RFC 3986)";
  given = "$.paths.[*].parameters[?(@.in=='query')].name";
  then = {
    function: pattern,
    functionOptions: {
      match: "^(?:[a-zA-Z0-9-._~])+$"
    }
  }
  severity = DiagnosticSeverity.Warning;
}

export class Fns07 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Filtrering, paginering och sökparametrar",
    id: "FNS.07",
  };
  description = "";
  message = "Vid användande av paginering, SKALL följande parametrar ingå i request: 'limit' och någon av 'page' eller 'offset'";
  given = "$.paths..parameters";
  then = {
    function: (targetVal: any, _opts: string, paths: string[]) => {
      const xor = (a, b) => (a && !b) || (!a && b);
      let isValid = false;
      let hasLimit = false;
      let hasPage = false;
      let hasOffset = false;
      targetVal.forEach(function (parameter, index) {
        if (parameter["in"] == "query") {

          if (parameter["name"] == "page") {
            hasPage = true;
          }
          if (parameter["name"] == "offset") {
            hasOffset = true;
          }
          if (parameter["name"] == "limit") {
            hasLimit = true;
          }
        }
      });
      // if there is a limit paramenter, check for existence of one of 'page' or 'offset' parameter
      if (hasLimit && xor(hasPage, hasOffset)) {
        isValid = true;
      } else if (hasLimit && !(hasPage || hasOffset)) {
        isValid = true;
      }

      if (isValid) {
        return [];
      } else {
        return [
            {
              message: this.message,
              severity: this.severity
           },
        ]
      }
    }
  }
  severity = DiagnosticSeverity.Error;
}

export default { Fns01, Fns03, Fns06, Fns07 };
