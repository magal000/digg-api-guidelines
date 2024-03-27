import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts"
const moduleName: string = "AmeRules.ts";

export class Ame01 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Message",
    id: "AME.01",
  };
  description = "Denna regel validerar att request och response är application/json.";
  message = "Datamodellen för en representation BÖR beskrivas med JSON enligt senaste versionen, RFC 8259.";
  given = "$.paths..content";
  then = [{
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
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,this.severity,
      this.constructor.name, moduleName,Ame01.customProperties);
    },
  }
];
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
  then = [{
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
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,this.severity,
      this.constructor.name, moduleName,Ame02.customProperties);
    }
  }
];
  severity = DiagnosticSeverity.Warning;
}
export default { Ame01, Ame02 };