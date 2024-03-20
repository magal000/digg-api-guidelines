import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"


export class Ame07 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Message",
    id: "AME.07",
  };
  description = "Fältnamn BÖR använda tecken som är alfanumeriska.";
  message = "Fältnamn BÖR använda tecken som är alfanumeriska.";
  given = "$.components.schemas..properties[*]~";
  then = {
    function: pattern,
    functionOptions: {
      match: "^[a-zA-Z0-9]+$"
    }
  }
  severity = DiagnosticSeverity.Warning;
}
export class Ame01 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Message",
    id: "AME.01",
  };
  description = "Denna regel validerar att request och response är application/json.";
  message = "Datamodellen för en representation BÖR beskrivas med JSON enligt senaste versionen, RFC 8259.";
  given = "$.paths..content";
  then = {
    function: (targetVal: any, _opts: string, paths: string[]) => {
      var valid:boolean = false;

      if (targetVal.hasOwnProperty('application/json')) {
        valid = true;
      }

      if (!valid) {
        return [
          {
            message: this.message,
            severity: this.severity
          },
        ];
      } else {
        return [];
      }
    }
  }
  severity = DiagnosticSeverity.Warning;
}

export class Ame02 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Message",
    id: "AME.02",
  };
  description = "Denna regel validerar att response är application/json.";
  message = "Det BÖR förutsättas att alla request headers som standard använder 'Accept' med värde 'application/json'";
  given = "$.paths.*.*..content";
  then = {
    function: (targetVal: any, _opts: string, paths: string[]) => {
      var valid:boolean = false;

      Object.getOwnPropertyNames(targetVal).forEach(function (item, index) {
        if (item.toLocaleLowerCase().includes('application/json')) {
          valid = true;
        }
      });

      if (!valid) {
        return [
          {
            message: this.message,
            severity: this.severity
          },
        ];
      } else {
        return [];
      }
    }
  }
  severity = DiagnosticSeverity.Warning;
}

export default { Ame01, Ame02, Ame07};
