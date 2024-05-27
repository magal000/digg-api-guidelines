import { enumeration, falsy, undefined as undefinedFunc, pattern } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import pkg from '@stoplight/spectral-formats';
const { oas2,oas3} = pkg;
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts";


const moduleName: string = "ForRules.ts";
/**
 * Module contains classes with functions that are need
 */
export class For01 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Förutsättningar",
    id: "FOR.01",
  };
  description = "Swagger 2-filer är inte tillåtna. Använd OpenAPI >= 3.0";
  message = "Swagger 2-filer är inte tillåtna. Använd OpenAPI >= 3.0";
  given = "$";
  then = [{
      field: 'swagger',
      function: falsy,
  },
  {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,For01.customProperties);
      }
  }
];
 severity = DiagnosticSeverity.Error;
}
/**
 * Rule for detect   
 */
export class For02 extends BaseRuleset {
  static customProperties: CustomProperties = {
  område: "Förutsättningar",
  id: "FOR.02",
  };
  description = "EN GET -förfrågan SKALL INTE acceptera en body";
  message = "EN GET -förfrågan SKALL INTE acceptera en body";
  given = "$.paths..get";
  then = [{
    field: "requestBody",
    function: undefinedFunc
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,For02.customProperties);
      }
    }
  ]
  formats = [oas3];
  severity = DiagnosticSeverity.Error
}
export default { For01, For02 };
